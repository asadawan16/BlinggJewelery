import { Navigate } from "react-router-dom";
import "../Order/placeorder.css";
import { useState } from "react";
import API from "../../axiosInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../Store/cart-slice";
import { clearCart, fetchCartData } from "../../Store/cart-actions";

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

    // Ensure cart is not empty
    if (cartData.items.length === 0) {
      return navigate("/cart");
    }
    const formattedProducts = cartData.items.map((product) => ({
      _id: product.id, // Convert `id` to `_id`
      productname: product.name, // Change `name` to `productname`
      productprice: product.price, // Change `price` to `productprice`
      quantity: product.quantity, // Keep `quantity` unchanged
    }));

    const token = sessionStorage.getItem("jwtToken"); // Retrieve JWT token if user is logged in
    console.log("token", token);

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
              <tr key={product._id} className="order">
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>${product.quantity * product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Total Payment : ${cartData.totalPayment}</h3>
        <h2>Shippin Details</h2>
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
