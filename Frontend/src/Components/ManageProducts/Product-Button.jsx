import React from "react";
import { useDispatch } from "react-redux";
import { productActions } from "../../Store/product-slice";
import { deleteProducts } from "../../Store/product-actions";
import "./Product-Button.css";
const ProductButton = ({ id }) => {
  const dispatch = useDispatch();

  return (
    <div id="manage-product-button">
      <button
        id="update-button"
        onClick={() => {
          if (window.confirm("Are you sure you want to update this product?")) {
            {
              dispatch(productActions.setSelectedProduct(id));
              dispatch(productActions.setShowUpdateForm(true));
              dispatch(productActions.setToggle(true));
            }
          }
        }}
      >
        Update
      </button>
      <button
        id="remove-button"
        onClick={() => {
          if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(deleteProducts(id));
          }
        }}
      >
        Remove
      </button>
    </div>
  );
};

export default ProductButton;
