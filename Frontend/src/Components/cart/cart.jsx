import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./cart.css";
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../Store/cart-slice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartdata = useSelector((state) => state.cart);
  return (
    <>
      <Link to={"/products"} className="backtoproducts">
        <IoMdArrowBack className="back-arrow" />
        Back
      </Link>
      <div className="cart">
        <div className="container">
          <h2>CART</h2>
          {cartdata.items.length === 0 ? <h3>Cart is empty</h3> : null}
          <ul className="cart-grid">
            <li className="cart-item" id="cart-header">
              <h4>Product</h4>
              <span>Price</span>
              <span>Quantity</span>
              <span></span>
              <span>Total</span>
            </li>
            {cartdata.items.map((item) => (
              <li className="cart-item" key={item.id}>
                <h4>{item.name}</h4>
                <span>${item.price}</span>
                <div className="quantity">
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(cartActions.removeItemFromCart(item.id))
                    }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    name=""
                    id=""
                    min="1"
                    value={item.quantity}
                    readOnly
                  />
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(
                        cartActions.addItemToCart({
                          id: item.id,
                          title: item.title,
                          price: item.price,
                        })
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <span>${item.totalPrice}</span>
              </li>
            ))}
          </ul>
          <h3>Total: ${cartdata.totalPayment}</h3>
          {cartdata.length !== 0 && (
            <Link to="/placeorder" className="checkoutbtn">
              Checkout
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
