import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductItem.css";
import { cartActions } from "../../Store/cart-slice";
import { RiShoppingBasket2Line } from "react-icons/ri";
import ProductButton from "../ManageProducts/Product-Button";

const ProductItem = ({ id, title, imagePath, quantity, price }) => {
  const dispatch = useDispatch();
  const Toggle = useSelector((state) => state.product.Toggle);
  return (
    <li className="product" key={id}>
      {quantity > 0 && (
        <>
          <RiShoppingBasket2Line className="product-cart-icon" />
          <span className="addedtocart-quantity">{quantity}</span>
        </>
      )}
      <div className="product-image">
        <img src={`/uploads/${imagePath}`} alt={title} />
      </div>
      <h3>{title}</h3>
      <span>${price}</span>
      {!Toggle ? (
        <button
          className="add-to-cart-button"
          onClick={() => {
            dispatch(
              cartActions.addItemToCart({
                id,
                title,
                price,
              })
            );
          }}
        >
          Add to cart
        </button>
      ) : (
        <ProductButton id={id} />
      )}
    </li>
  );
};

export default ProductItem;
