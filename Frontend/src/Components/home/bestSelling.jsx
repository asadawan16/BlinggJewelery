import "./bestSelling.css";
import { useSelector } from "react-redux";
import ProductItem from "../products/productItem";
function BestSelling() {
  const cartData = useSelector((state) => state.cart);
  const products = useSelector((state) => state.product.products);
  return (
    <div className="best-selling">
      <div className="container">
        <span>Shop</span>
        <h2>Best Selling</h2>
        <ul className="grid">
          {products
            .filter(
              (products) =>
                products.category === "bestselling" ||
                products.category === "Necklace"
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
}
export default BestSelling;
