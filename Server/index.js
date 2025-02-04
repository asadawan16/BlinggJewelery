require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const ProductModel = require("./models/product");
const UserModel = require("./models/user");
const OrderModel = require("./models/Orders");
const CartModel = require("./models/Cart");
const vercelBlob = require("@vercel/blob");
const { put, del } = vercelBlob;
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  "https://blingg-jewelery.vercel.app",
  "http://localhost:5173",
];

const app = express();
// Cors Configuration
app.use(
  cors(
    {
      origin: allowedOrigins,
      credentials: true,
      exposedHeaders: ["Authorization"],
    },
    (req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", allowedOrigins);
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
      next();
    }
  )
);
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://asad:Arena2k16@ecommerce.tl4xg.mongodb.net/Ecommerce?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("Hello Server is Running");
});

const authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract token after "Bearer "

  try {
    const verified = jwt.verify(token, "blinggJewelery");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

app.get("/products", async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.json(products);
  } catch {
    res.status(500).json({ error: "Error fetching products" });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch {
    res.status(500).json({ error: "Error fetching product" });
  }
});
// Add a new product
app.post("/addproducts", upload.single("image"), async (req, res) => {
  try {
    const { productname, productprice, category, description } = req.body;
    if (!productname || !productprice || !category || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let imageURL = null;
    if (req.file) {
      const blob = await put(
        `products/${req.file.originalname}`,
        req.file.buffer,
        {
          access: "public",
        }
      );
      imageURL = blob.url;
    }

    const newProduct = new ProductModel({
      productname,
      productprice,
      category,
      image: imageURL,
      description,
    });

    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Error adding product" });
  }
});
app.put("/updateproducts/:id", upload.single("image"), async (req, res) => {
  try {
    const { productname, productprice, category, description } = req.body;
    const product = await ProductModel.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    let imageURL = product.image;
    if (req.file) {
      if (product.image) {
        const filePath = product.image.split("/").pop(); // Extract filename
        await del(`products/${filePath}`); // Delete old image
      }

      const blob = await put(
        `products/${req.file.originalname}`,
        req.file.buffer,
        {
          access: "public",
        }
      );
      imageURL = blob.url;
    }

    product.productname = productname || product.productname;
    product.productprice = productprice || product.productprice;
    product.category = category || product.category;
    product.description = description || product.description;
    product.image = imageURL;

    await product.save();
    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Error updating product" });
  }
});

// Delete a product
app.delete("/deleteproducts/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    if (product.image) {
      const filePath = product.image.split("/").pop(); // Extract filename
      await del(`products/${filePath}`); // Delete from Vercel Blob
    }

    await ProductModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Error deleting product" });
  }
});

// User endpoints
app.post("/signup", async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch {
    res.status(500).json({ error: "Signup failed" });
  }
});
// Login endpoint
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, "blinggJewelery", {
      expiresIn: "1h",
    });
    res.json({ token, user: { id: user._id, role: user.role } });
  } catch {
    res.status(500).json({ error: "Login failed" });
  }
});

// Order endpoints
app.get("/user-orders", authenticate, async (req, res) => {
  try {
    const orders = await OrderModel.find({ userId: req.user.id });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: "Failed to fetch user orders" });
  }
});

app.get("/all-orders", authenticate, async (req, res) => {
  try {
    const orders = await OrderModel.find({});
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ error: "Failed to fetch all orders" });
  }
});

app.post("/placeorder", authenticate, async (req, res) => {
  try {
    const { products, totalpayment, shippingaddress, contact, email, name } =
      req.body;

    const order = new OrderModel({
      userId: req.user ? req.user.id : null, // Store user ID if logged in
      guestId: req.user ? null : `guest_${Date.now()}`, // Assign guest ID if not logged in
      contact,
      name,
      email,
      shippingaddress,
      totalpayment,
      products,
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({ error: "Error placing order" });
  }
});

// Cart endpoints
app.put("/addtocart", authenticate, async (req, res) => {
  try {
    console.log("Authenticated User ID:", req.user.id);
    console.log("Request Body:", req.body); // Log the incoming request data

    const user = await UserModel.findById(req.user.id);
    if (!user) {
      console.log("User not found in the database!");
      return res.status(404).json({ error: "User not found" });
    }

    const { items, totalQuantity, totalPayment, changed } = req.body;

    // Ensure all required fields are present
    if (!items || !totalQuantity || !totalPayment) {
      console.log("Missing required fields!");
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Update or create the user's cart
    let cart = await CartModel.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new CartModel({
        userId: req.user.id,
        items,
        totalQuantity,
        totalPayment,
        changed,
      });
    } else {
      cart.items = items;
      cart.totalQuantity = totalQuantity;
      cart.totalPayment = totalPayment;
      cart.changed = changed;
    }

    await cart.save();
    res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ error: "Error updating cart" });
  }
});
app.get("/cart", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res.json({
        items: [],
        totalQuantity: 0,
        totalPayment: 0,
        changed: false,
      });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error fetching cart data" });
  }
});
// Clear the cart
app.delete("/clearcart", authenticate, async (req, res) => {
  try {
    await CartModel.findOneAndUpdate(
      { userId: req.user.id },
      { items: [], totalQuantity: 0, totalPayment: 0 }
    );
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ error: "Error clearing cart" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
