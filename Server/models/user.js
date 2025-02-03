const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  email: { type: String, unique: true, required: true },
  password: String,
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

const UserModel = mongoose.model("UserSignup", UserSchema);
module.exports = UserModel;
