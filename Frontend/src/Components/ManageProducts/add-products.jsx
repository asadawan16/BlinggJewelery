import React, { useState } from "react";
import "./add-products.css";
import { useDispatch } from "react-redux";
import { addProducts } from "../../Store/product-actions";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const [productname, setProductname] = useState("");
  const [productprice, setProductprice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(""); // Store image URL
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Preview new image
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productname || !productprice || !category || !description) {
      alert("All fields are required");
    }
    const productData = new FormData();
    productData.append("productname", productname || "");
    productData.append("productprice", productprice || "");
    productData.append("category", category || "");
    productData.append("description", description || "");

    if (image) {
      productData.append("image", image);
    }
    try {
      await dispatch(addProducts(productData));
      alert("Product added successfully!");
      setProductname("");
      setProductprice("");
      setCategory("");
      setDescription("");
      setImage(null);
      setImagePreview("");
    } catch (error) {
      alert("Failed to add product. Please try again!");
    }
  };

  return (
    <div className="add-products-form">
      <form onSubmit={handleSubmit} className="add-products-form">
        <div className="container">
          <h1>Add Products</h1>

          <input
            type="text"
            name="productname"
            placeholder="Product Name"
            value={productname}
            onChange={(e) => setProductname(e.target.value)}
            required
          />
          <input
            type="text"
            name="productprice"
            placeholder="Product Price"
            value={productprice}
            onChange={(e) => setProductprice(e.target.value)}
            required
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">All Products</option>
            <option value="Rings">Rings</option>
            <option value="Bracelets">Bracelete</option>
            <option value="Necklace">Necklace</option>
            <option value="Earrings">Earrings</option>
            <option value="trending">trending</option>
            <option value="bestselling">bestselling</option>
          </select>
          <input
            type="text"
            name="description"
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Selected Product"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
              }}
            />
          )}
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            required
          />
          <button type="submit">Add Product</button>
          <button
            type="clear"
            onClick={() => {
              navigate("/AdminDashboard");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
