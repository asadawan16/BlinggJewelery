import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = sessionStorage.getItem("user");

  console.log("User Data:", user);

  return user.replace(/"/g, "") === "admin" ? (
    children
  ) : (
    <Navigate to="/home" />
  );
};

export default PrivateRoute;
