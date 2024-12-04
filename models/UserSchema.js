const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  lib: { type: Boolean },
  password: { type: String },
});

const user = mongoose.model("user", UserSchema);

module.exports = user;
