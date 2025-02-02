import API from "../axiosInstance";
import { authActions } from "./Auth-Slice";
import { fetchCartData } from "./cart-actions";

export const authenticate = (data) => async (dispatch) => {
  try {
    const { data: response } = await API.post("/login", data);

    localStorage.setItem("jwtToken", response.token);
    localStorage.setItem("user", JSON.stringify(response.user.role));
    sessionStorage.setItem("jwtToken", response.token);
    sessionStorage.setItem("user", JSON.stringify(response.user.role));
    dispatch(
      authActions.login({ token: response.token, user: response.user.role })
    );
    dispatch(fetchCartData());
    return { success: true, user: response.user };
  } catch (err) {
    console.error("Login error:", err.response?.data?.error || err.message);
    return {
      success: false,
      error: err.response?.data?.error || "Login failed",
    };
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  sessionStorage.removeItem("jwtToken");
  dispatch(authActions.logout());
};
