import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";
import logo from "../../assets/blingg-logo.png";
const Welcome = () => {
  return (
    <div className="welcome">
      <img src={logo} alt="" />
      <h1>WELCOME TO BLINGG JEWELRY STORE</h1>
      <div className="options">
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
        <Link to="/home">Continue as a Guest</Link>
      </div>
    </div>
  );
};

export default Welcome;
