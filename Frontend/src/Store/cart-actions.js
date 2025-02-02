import { cartActions } from "./cart-slice";
import API from "../axiosInstance";
export const fetchCartData = () => {
  return async (dispatch) => {
    try {
      const token = sessionStorage.getItem("jwtToken");
      const response = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(
        cartActions.replaceCart({
          items: response.data.items || [],
          totalQuantity: response.data.totalQuantity || 0,
          totalPayment: response.data.totalPayment || 0,
          changed: response.data.changed || false,
        })
      );
    } catch (error) {
      console.log("FETCHING carterror", error);
    }
  };
};

// Send Cart Data
export const sendCartData = (cart) => {
  return async (dispatch) => {
    try {
      const token = sessionStorage.getItem("jwtToken");

      await API.put(
        "/addtocart",
        {
          items: cart.items,
          totalQuantity: cart.totalQuantity,
          totalPayment: cart.totalPayment,
          changed: cart.changed,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log("carterror", error);
    }
  };
};
export const clearCart = () => {
  return async (dispatch) => {
    try {
      const token = sessionStorage.getItem("jwtToken");
      const response = await API.delete("/clearcart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) dispatch(cartActions.clearCart());
    } catch (error) {
      console.log("carterror", error);
    }
  };
};
