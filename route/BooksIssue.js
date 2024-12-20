const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const user = require("./../models/UserSchema");
const userRead = require("./../models/UserReadSchema");
const books = require("./../models/BookSchema");
const auth = require("./../authentication/middleware");
const { parse } = require("dotenv");

const app = express();
const router = express.Router();

app.use(express.json());

router.post("/addbooks", auth, async (req, res) => {
  const { title, pages, author } = req.body;
  console.log(req.body);
  if (!title || pages == null || author == null) {
    return res.status(400).json({
      success: false,
      message: ",give all required fields",
    });
  }

  if (req.isLib == false) {
    return res.status(400).json({
      success: false,
      message: "Authentication Failed",
    });
  }

  try {
    await book.create({
      title: title,
      pages: pages,
      author: author,
    });

    return res.status(200).json({
      success: true,
      message: "finely created",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/issueBooks", auth, async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "pls add books",
    });
  }

  const bookAvail = await books.findOne({ title: title });

  if (!bookAvail) {
    return res.status(400).json({
      success: false,
      message: "book not found",
    });
  }

  const userAvail = await user.findOne({ email: req.emailId });

  userRead.create({
    UserId: userAvail._id,
    BookId: bookAvail._id,
    issued: false,
    issuedDate: Date.now(),
  });

  return res.status(200).json({
    success: true,
    message: "book added successfully",
  });
});

router.put("/availBooks", auth, async (req, res) => {
  const isLib = req.isLib;

  if (!isLib) {
    return res.status(404).json({
      success: false,
      message: "not eligible to avail books",
    });
  }

  try {
    const { id, state } = req.query;

    const result = await userRead.updateOne(
      { _id: id },
      { $set: { issued: state, issuedDate: Date.now() } }
    );

    return res.status(200).json({
      success: true,
      message: result,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error,
    });
  }
}); // this is working
// http://localhost:3000/availBooks?id=675138eed476ff40161a57c8&state=true

const update = async (req, res) => {
  console.log("Hii");
  try {
    // delete all books that have crossed one week
    const booksIssued = await userRead.find({ issued: true });
    console.log(Date.now());

    const toDelete = booksIssued.filter(
      (data) => Date.now() >= data.issuedDate.getTime() + 300000
    );

    for (let data of toDelete) {
      console.log(await userRead.deleteOne({ _id: data._id })); // acknoledgement for deleting data
    }

    return res.status(200).json({
      success: true,
      message: typeof booksIssued,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

router.get("/update", auth, update);

module.exports = router;
