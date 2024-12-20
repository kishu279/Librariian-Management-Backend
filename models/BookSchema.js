const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  pages: { type: Number },
  author: [
    {
      name: { type: String, required: true },
    },
  ],
});

const book = mongoose.model("book", BookSchema);

module.exports = book;
