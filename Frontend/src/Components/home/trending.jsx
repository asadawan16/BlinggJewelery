import { React } from "react";
import { useSelector } from "react-redux";
import "./trending.css";
import ProductItem from "../products/productItem";
const Trending = () => {
  const cartData = useSelector((state) => state.cart);
  const products = useSelector((state) => state.product.products);

  return (
    <div className="trending">
      <div className="container">
        <span>Popular products</span>
        <h2>Trending now</h2>

        <ul className="products-grid">
          {products
            .filter(
              (products) =>
                products.category === "trending" ||
                products.category === "Earrings"
            )
            .map((product) => {
              // Find the product in the cart only once
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
  );
};
export default Trending;
