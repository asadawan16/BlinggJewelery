import React from "react";
import logo from "../../assets/logo-regular.png";
import "./header.css";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store/Auth-Slice";
import { CiPower } from "react-icons/ci";
import { RiShoppingBasket2Line } from "react-icons/ri";

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const cartItems = useSelector((state) => state.cart.totalQuantity);
  const user = useSelector((state) => state.auth.user);
  console.log("User Data:", user);

  const handleAuthenticated = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    sessionStorage.removeItem("jwtToken");
    sessionStorage.removeItem("user");
    dispatch(authActions.logout());
  };
  return (
    <header>
      <div className="container">
        <div className="logo">
          <img src={logo} alt="" />
        </div>

        <nav className="nav">
          <ul>
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Products
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink
                  to="/myorders"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  MyOrders
                </NavLink>
              </li>
            )}
            {user === "admin" && (
              <li>
                <NavLink
                  to="/AdminDashboard"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Admin Dashboard
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        <div className="header-btn">
          <Link to="/cart">
            <RiShoppingBasket2Line className="cart-icon" />
            <span id="cart-count">{cartItems}</span>
          </Link>
          <Link
            to="/login"
            id="login-signup-btn"
            onClick={() => {
              isAuthenticated && handleAuthenticated();
            }}
          >
            <CiPower className="logut-icon" />
            {isAuthenticated ? "Logout" : "Sign Up"}
          </Link>
        </div>
      </div>
    </header>
  );
};
export default Header;
