import { Navigate } from "react-router-dom";
import "../Order/placeorder.css";
import { useState } from "react";
import API from "../../axiosInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../Store/cart-slice";
import { clearCart, fetchCartData } from "../../Store/cart-actions";
import { fetchUserOrder } from "../../Store/Order-actions";

const PlaceOrder = () => {
  const [contact, setContact] = useState("");
  const [shippingaddress, setShippingAddress] = useState("");
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const navigate = useNavigate();
  const cartData = useSelector((state) => state.cart);
  console.log("cartData", cartData.items);
  const dispatch = useDispatch();

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (
      name.length === 0 ||
      email.length === 0 ||
      contact.length === 0 ||
      shippingaddress.length === 0
    ) {
      alert("Please fill all the details");
      return;
    }
    if (cartData.items.length === 0) {
      return navigate("/cart");
    }
    const formattedProducts = cartData.items.map((product) => ({
      _id: product.id,
      productname: product.name,
      productprice: product.price,
      quantity: product.quantity,
    }));

    const token = sessionStorage.getItem("jwtToken");
    const orderData = {
      products: formattedProducts,
      totalpayment: cartData.totalPayment,
      shippingaddress,
      contact,
      email,
      name,
    };

    try {
      const response = await API.post("/placeorder", orderData, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      console.log("Order placed successfully:", response.data);
      dispatch(clearCart());
      dispatch(fetchCartData());
      // Reset form fields
      setContact("");
      setShippingAddress("");
      setEmail("");
      setname("");
      dispatch(fetchUserOrder());
      navigate("/thankyou");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <form id="placeorder" onSubmit={handleCheckout}>
      <h1>Place Order</h1>
      <div className="container">
        <table className="orderedproducts">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price per item</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartData.items.map((product) => (
              <tr key={product._id} className="order-items">
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>${product.quantity * product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Total Payment : ${cartData.totalPayment}</h2>
        <h3>Shipping Details</h3>
        <input
          type="text"
          name=""
          id="name"
          placeholder="Enter your name"
          required
          onChange={(e) => setname(e.target.value)}
        />
        <input
          type="number"
          name=""
          id="contact"
          placeholder="Enter your contact number"
          required
          onChange={(e) => setContact(e.target.value)}
        />
        <input
          type="email"
          name=""
          id="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Enter Your Address"
          rows={7}
          onChange={(e) => setShippingAddress(e.target.value)}
          required
        />
      </div>
      <button type="Submit" className="checkoutbtn" onClick={handleCheckout}>
        Place Order
      </button>
    </form>
  );
};

export default PlaceOrder;
