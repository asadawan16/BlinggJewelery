const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  name: String,
  price: Number,
  quantity: Number,
  totalPrice: Number,
});

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSignup",
      required: true,
    },
    items: [CartItemSchema],
    totalQuantity: { type: Number, default: 0 },
    totalPayment: { type: Number, default: 0 },
    changed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const CartModel = mongoose.model("Cart", CartSchema);
module.exports = CartModel;
