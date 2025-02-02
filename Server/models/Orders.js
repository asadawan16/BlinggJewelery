const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
  productname: String,
  productprice: String,
  quantity: Number,
});

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSignup",
      required: false,
    },
    guestId: { type: String, required: false }, // For guest orders
    contact: String,
    email: String,
    name: String,
    shippingaddress: String,
    totalpayment: String,
    orderStatus: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered"],
      default: "Pending",
    },
    products: [ProductsSchema],
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Orders", OrderSchema);
module.exports = OrderModel;
