import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Login-signup.css";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { authenticate } from "../../Store/Auth-actions";
const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [toggledisabled, setToggleDisabled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setToggleDisabled(true);
    const result = await dispatch(authenticate(credentials));
    const user = result.user;
    if (result.success && user.role === "admin") {
      navigate("/AdminDashboard");
      return;
    }
    if (result.success && user.role === "user") {
      navigate("/home");
      return;
    } else {
      setToggleDisabled(false);
      console.log(result.error);
    }
  };
  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h1>Login</h1>
        <span>Welcome back! Please log in to access your account.</span>
        <label htmlFor="email" className="login-email">
          Email or Username
        </label>
        <input
          type="text"
          name="email"
          id="email"
          className="login-email"
          placeholder="Enter your email"
          value={credentials.email}
          onChange={handleChange}
        />
        <label htmlFor="password" className="login-password">
          Password
        </label>
        <div className="password">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Enter your password"
            value={credentials.password}
            onChange={handleChange}
          />
          {showPassword ? (
            <IoMdEye
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <IoMdEyeOff
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
        <Link to={"/forgotpassword"} className="forgotpassword">
          Forgot Password?
        </Link>

        <button
          type="submit"
          className="submitbtn"
          disabled={toggledisabled}
          style={toggledisabled ? { opacity: 0.5, cursor: "not-allowed" } : {}}
        >
          Login
        </button>
        <span className="choice">OR</span>
        <p className="redirect">
          Don't have an account?
          <Link to={"/signup"} className="login-link">
            Signup
          </Link>
          or
          <Link to={"/home"} className="guest-link">
            Continue as a Guest
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
