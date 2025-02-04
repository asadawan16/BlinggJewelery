import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PlaceOrder from "./Components/Order/placeorder";
import Products from "./Components/products/products";
import Home from "./Components/home/Home";
import Cart from "./Components/cart/cart";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import AddProducts from "./Components/ManageProducts/add-products";
import UpdateProducts from "./Components/ManageProducts/update-products";
import Thankyou from "./Components/Order/thankyou";
import Welcome from "./Components/Welcome/Welcome";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./Store/product-actions";
import { authActions } from "./Store/Auth-Slice";
import { fetchCartData, sendCartData } from "./Store/cart-actions";
import { fetchOrderData, fetchUserOrder } from "./Store/Order-actions";
import PrivateRoute from "./Components/Restrictions/privateroute";
import Orders from "./Components/Order/Orders";
let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = sessionStorage.getItem("user");
  const token = sessionStorage.getItem("jwtToken");
  console.log("JWTTOKEN:", token);
  // Fetching Products
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  // orders

  // Handling Authentication
  useEffect(() => {
    if (token && userRole) {
      dispatch(authActions.login({ token, user: userRole }));
    }
  }, []);

  // Handling cart Data
  useEffect(() => {
    if (isAuthenticated && token) {
      dispatch(fetchCartData());
    }
  }, [dispatch]);

  useEffect(() => {
    if (isInitial && !isAuthenticated) {
      isInitial = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products show={true} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/myorders" element={<Orders />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/thankyou" element={<Thankyou />} />
        {/* Admin Routes */}
        <Route
          path="/AdminDashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/addproducts"
          element={
            <PrivateRoute>
              <AddProducts />
            </PrivateRoute>
          }
        />
        <Route
          path="/manageproducts"
          element={
            <PrivateRoute>
              <UpdateProducts />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
