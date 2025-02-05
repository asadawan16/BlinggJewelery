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

          {cartdata.items.length === 0 ? (
            <>
              <h3>Cart is empty</h3>
              <Link to="/products">Back to Shop</Link>
            </>
          ) : (
            <>
              <table className="cart-grid">
                <thead id="cart-header">
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th className="itemtotalprice">Total</th>
                </thead>
                <tbody>
                  {cartdata.items.map((item) => (
                    <tr className="cart-item" key={item.id}>
                      <td>
                        <span>{item.name}</span>
                      </td>
                      <td>
                        <span>${item.price}</span>
                      </td>
                      <td>
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
                                  name: item.name,
                                  price: item.price,
                                })
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="itemtotalprice">
                        <span>${item.totalPrice}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h3>Total: ${cartdata.totalPayment}</h3>
            </>
          )}

          {cartdata.items.length !== 0 && (
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
