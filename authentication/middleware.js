const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const user = require("./../models/UserSchema");

const app = express();

// This middleware is authenticating by taking token from headers and

const auth = async (req, res, next) => {
  const auth_var = req.headers["authorization"];

  if (!auth_var) {
    return res.status(400).json({
      success: false,
      message: "token not found",
    });
  }

  try {
    // console.log(auth_var);
    const token = auth_var.split(" ")[1] || null;

    if (!token) {
      return res.status(404).json({
        success: false,
        message: "token not authenticated",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
      if (error) {
        return res.status(401).json({
          success: false,
          message: "token expired",
        });
      }

      // if token not expired then for next function it will be returning email_id and is_lib
      req.emailId = decoded.email;
      req.isLib = decoded.lib;

      next();
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;
