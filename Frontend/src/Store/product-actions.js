import { productActions } from "./product-slice";
import API from "../axiosInstance";
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await API.get("/products");
      dispatch(productActions.setProducts(response.data));
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };
};
export const addProducts = (product) => {
  return async (dispatch) => {
    try {
      const token = sessionStorage.getItem("jwtToken");

      if (!token) {
        console.error("No token found. User not authenticated.");
        return;
      }

      await API.post("/addproducts", product, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Product added successfully");
      dispatch(fetchProducts());
    } catch (error) {
      console.error(
        "Adding Product Failed:",
        error.response?.data || error.message
      );
    }
  };
};

export const updateProducts = (id, product) => {
  return async (dispatch) => {
    try {
      await API.put(`/updateproducts/${id}`, product, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      });

      dispatch(fetchProducts());
      return true;
    } catch (error) {
      console.error(
        "Updating Product Failed:",
        error.response?.data || error.message
      );
      throw error;
    }
  };
};

export const deleteProducts = (id) => {
  return async (dispatch) => {
    try {
      await API.delete(`/deleteproducts/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      });

      dispatch(fetchProducts());
    } catch (error) {
      console.error(
        "Deleting Product Failed:",
        error.response?.data || error.message
      );
    }
  };
};
