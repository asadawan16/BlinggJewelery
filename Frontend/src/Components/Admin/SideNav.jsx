import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";
import { useSelector } from "react-redux";
const SideNav = ({ setActiveComponent }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const handleAuthenticated = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    sessionStorage.removeItem("jwtToken");
    sessionStorage.removeItem("user");
    dispatch(authActions.logout());
  };
  return (
    <div id="admin-header">
      <nav>
        <ul>
          <li>
            <Link to="/manageproducts">Update Products</Link>
          </li>
          <li>
            <Link to="/addproducts">Add Products</Link>
          </li>
          <li>
            <Link to="/manageproducts">Delete Products</Link>
          </li>
        </ul>
        <h2>COMMON PAGES</h2>
        <ul className="common-pages">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>
          <li>
            <Link
              to="/login"
              onClick={() => {
                isAuthenticated && handleAuthenticated();
              }}
            >
              {isAuthenticated ? "Logout" : "Sign Up"}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
