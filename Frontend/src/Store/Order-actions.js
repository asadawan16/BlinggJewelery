import { orderActions } from "./Order-Slice";
import API from "../axiosInstance";
const user = sessionStorage.getItem("user");
export const fetchOrderData = () => {
  return async (dispatch) => {
    if (!user.role === "admin") {
      return;
    }
    try {
      const response = await API.get("/all-orders", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      });
      dispatch(orderActions.setOrder(response.data));
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };
};

export const fetchUserOrder = () => {
  return async () => {
    try {
      const response = API.get("/user-orders", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      });
      dispatch(orderActions.setOrder(response.data));
      console.log("specific order", response.data);
    } catch (error) {
      console.log("error fetching user Orders", error.message);
    }
  };
};
