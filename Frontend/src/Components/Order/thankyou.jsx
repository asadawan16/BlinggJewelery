import React from "react";
import { Link } from "react-router-dom";
import "./thankyou.css";
const Thankyou = () => {
  return (
    <div className="thankspage">
      <div className="container">
        <h1>thankyou for Ordering Your Order is Confirmed</h1>
        <Link to={"/home"}>Back to Shopping</Link>
      </div>
    </div>
  );
};

export default Thankyou;
