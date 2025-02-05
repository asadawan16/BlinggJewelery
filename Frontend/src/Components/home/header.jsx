import React, { useState } from "react";
import logo from "../../assets/logo-regular.png";
import "./header.css";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store/Auth-Slice";
import { CiPower } from "react-icons/ci";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const cartItems = useSelector((state) => state.cart.totalQuantity);
  const user =
    JSON.parse(sessionStorage.getItem("user")) ||
    useSelector((state) => state.auth.user);

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleLogout = () => {
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
          <img src={logo} alt="Logo" />
        </div>

        {/* Hamburger Menu for Mobile */}
        <div
          className="mobile-menu-icon"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
        >
          {mobileNavOpen ? <FiX size={30} /> : <FiMenu size={30} />}
        </div>

        {/* Navigation */}
        <nav className={`nav ${mobileNavOpen ? "mobile-nav-open" : ""}`}>
          <ul>
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setMobileNavOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setMobileNavOpen(false)}
              >
                Products
              </NavLink>
            </li>
            {isAuthenticated && (
              <li>
                <NavLink
                  to="/myorders"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={() => setMobileNavOpen(false)}
                >
                  {user === "user" ? "My Orders" : "Orders"}
                </NavLink>
              </li>
            )}
            {isAuthenticated && user === "admin" && (
              <li>
                <NavLink
                  to="/AdminDashboard"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={() => setMobileNavOpen(false)}
                >
                  Admin Dashboard
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        {/* Buttons for Login/Logout and Cart */}
        <div className="header-btn">
          <Link to="/cart">
            <RiShoppingBasket2Line className="cart-icon" />
            <span id="cart-count">{cartItems}</span>
          </Link>
          <Link
            to="/login"
            id="login-signup-btn"
            onClick={() => {
              isAuthenticated && handleLogout();
              setMobileNavOpen(false);
            }}
          >
            <CiPower className="logout-icon" />
            {isAuthenticated ? "Logout" : "Sign Up"}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
