require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const ProductModel = require("./models/product");
const UserModel = require("./models/user");
const OrderModel = require("./models/Orders");
const CartModel = require("./models/Cart");
const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "https://blingg-jewelery.vercel.app", // Replace with your frontend's URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(
    "mongodb+srv://asad:Arena2k16@ecommerce.tl4xg.mongodb.net/Ecommerce?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("Hello Server is Running");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, path.join(__dirname, "../Frontend/public/uploads")),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

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
app.post(
  "/addproducts",
  authenticate,
  upload.single("image"),
  async (req, res) => {
    try {
      const { productname, productprice, category, description } = req.body;

      if (!productname || !productprice || !category || !description) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const imagePath = req.file ? `uploads/${req.file.filename}` : null;

      const newProduct = new ProductModel({
        productname,
        productprice,
        category,
        image: imagePath,
        description,
      });

      const product = await newProduct.save();
      res.status(201).json(product);
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ error: "Error adding product" });
    }
  }
);

app.put("/updateproducts/:id", upload.single("image"), async (req, res) => {
  try {
    const { productname, productprice, category, description } = req.body;
    const product = await ProductModel.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    let imagePath = product.imagepath;
    if (req.file) {
      if (product.imagepath) fs.unlinkSync(product.imagepath);
      imagePath = path.join("uploads", req.file.filename);
    }
    product.productname = productname || product.productname;
    product.productprice = productprice || product.productprice;
    product.category = category || product.category;
    product.description = description || product.description;
    product.imagepath = imagePath;
    await product.save();
    res.json({ message: "Product updated successfully", product });
  } catch {
    res.status(500).json({ error: "Error updating product" });
  }
});

app.delete("/deleteproducts/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    if (product.imagepath) fs.unlinkSync(product.imagepath);
    await ProductModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch {
    res.status(500).json({ error: "Error deleting product" });
  }
});

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

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1h" });
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
  // Assuming only admins should access this
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
    console.log("Authenticated User:", req.user); // Debugging
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
