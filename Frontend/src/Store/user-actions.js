import API from "../axiosInstance";
import { userActions } from "./user-slice";
export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const response = await API.get("/users", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      });
      dispatch(userActions.setUser(response.data));
    } catch (error) {
      console.log("Error fetching users:", error.message);
    }
  };
};
