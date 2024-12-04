const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const user = require("./../models/UserSchema");
const userRead = require("./../models/UserReadSchema");
const book = require("./../models/BookSchema");
const { route } = require("./UserRoutes");

const app = express();
const router = express.Router();

app.use(express.json());

router.post("/addbooks", async (req, res) => {});

module.exports = router;
