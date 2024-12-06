require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const user = require("./../models/UserSchema");

const app = express();
app.use(express.json());
const router = express.Router();

// SIGN UP
router.post("/signup", async (req, res) => {
  const { username, email, lib, password } = req.body;

  if (!username || !email || !lib || !password) {
    console.log("enter all required field");
    return res.status(404).json({
      success: false,
      message: "enter all field correctly",
    });
  }
  const existingUser = await user.findOne({ email: email });

  if (existingUser) {
    return res.status(404).json({
      success: false,
      message: "User already exists",
    });
  }

  try {
    const hashPass = await bcrypt.hash(password, 10);

    await user.create({
      username: username,
      email: email,
      lib: lib,
      password: hashPass,
    });

    return res.status(200).json({
      success: true,
      message: "account created successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(404).josn({
      success: false,
      message: "failes",
    });
  }
});

// SIGN IN
router.post("/signin", async (req, res) => {
  const { email, lib, password } = req.body;

  if (!email || lib == null || !password) {
    console.log("enter all fields");
    return res.status(404);
  }

  const existingUser = await user.findOne({ email });

  if (!existingUser) {
    return res.status(404).json({
      success: false,
      message: "create account first",
    });
  }

  try {
    const isPass = bcrypt.compare(password, existingUser.password);
    if (!isPass) {
      return res.status(401).json({
        success: false,
        message: "credentials given are wrong",
      });
    }

    const token = jwt.sign({ email, lib }, process.env.JWT_SECRET_KEY, {
      expiresIn: "5h",
    });

    return res.status(200).send(token);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;