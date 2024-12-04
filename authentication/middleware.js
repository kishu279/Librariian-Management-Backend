const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const user = require("./../models/UserSchema");

const app = express();

// This middleware is authenticating by taking token from headers and

const auth = async (req, res, next) => {
  const token = req.headers["Authentication"];

  try {
    token = token.split("")[1] || null;

    if (!token) {
      return res.status(404).json({
        success: false,
        message: "token not authenticated",
      });
    }

    await jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
      if (error) {
        return res.status(401).json({
          success: false,
          message: "token expired",
        });
      }

      // if token not expired then for next function it will be returning email_id and is_lib

      req.emailId = decoded.email;
      req.isLib = decoded.lib;
    });
  } catch (error) {
    console.log(error);
  }
};
