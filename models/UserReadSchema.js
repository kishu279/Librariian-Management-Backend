const mongoose = require("mongoose");
const user = require("./UserSchema");
const book = require("./BookSchema");

const UserReadSchema = new mongoose.Schema({
  UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  BookId: { type: mongoose.Schema.Types.ObjectId, ref: 'book' },
  issued: { type: Boolean },
  issuedDate: { type: Date, default: Date.now() },
});

const userRead = mongoose.model("userRead", UserReadSchema);

module.exports = userRead;
