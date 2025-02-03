import React, { useEffect, useState } from "react";
import Header from "../home/header";
import Footer from "../home/footer";
import "./products.css";
import "../home/trending.css";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "./productItem";
import { productActions } from "../../Store/product-slice";

const Products = ({ show, hide }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productActions.setToggle(false));
  }, [dispatch]);
  const [searchByName, setSearchByName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const products = useSelector((state) => state.product.products);
  const cartData = useSelector((state) => state.cart);
  // Filter products based on search query and selected category
  const filteredProducts = products.filter((product) => {
    const nameMatch = product.productname
      .toLowerCase()
      .includes(searchByName.toLowerCase());
    const categoryMatch = selectedCategory
      ? product.category === selectedCategory
      : true;
    return nameMatch && categoryMatch;
  });

  return (
    <>
      {hide ? null : show && <Header />}
      <div className="products">
        <div className="container">
          <h2>Find products of your choice</h2>
          <div className="search-grid">
            <input
              type="text"
              name="searchbyName"
              placeholder="Search by name"
              value={searchByName}
              onChange={(e) => setSearchByName(e.target.value)}
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Rings">Rings</option>
              <option value="Bracelets">Bracelets</option>
              <option value="Earrings">Earrings</option>
              <option value="Bracelets">trending</option>
              <option value="Rings">bestselling</option>
            </select>
          </div>
          <div className="product-grid">
            <ul className="grid">
              {filteredProducts.map((product) => {
                // Find the product in the cart
                const productInCart = cartData.items.find(
                  (item) => item.id === product._id
                );
                const quantity = productInCart ? productInCart.quantity : 0;

                return (
                  <ProductItem
                    key={product._id}
                    id={product._id}
                    title={product.productname}
                    imagePath={product.image}
                    product={product}
                    quantity={quantity}
                    price={product.productprice}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      {hide ? null : show && <Footer />}
    </>
  );
};

export default Products;
