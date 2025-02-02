import { orderActions } from "./Order-Slice";
import axios from "axios";
export const fetchOrderData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:5000/all-orders", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      });
      dispatch(orderActions.setOrder(response.data));
      console.log("Fetched orders:", response.data);
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };
};
