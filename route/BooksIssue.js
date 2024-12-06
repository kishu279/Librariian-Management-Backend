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
    return res.status(400).json({
      success: false,
      message: "Authentication Failed",
    });
  }

  const { id, state } = req.query;
  try {
    const bookToIssue = await userRead.updateOne(
      { _id: id },
      { $set: { issued: state } }
    );

    if (bookToIssue) {
      return res.status(200).json({
        success: true,
        message: bookToIssue,
      });
    }

    return res.status(200).json({
      success: true,
      message: bookToIssue,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
