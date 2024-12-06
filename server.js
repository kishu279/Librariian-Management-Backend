require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const user = require("./models/UserSchema");
const userRead = require("./models/UserReadSchema");
const books = require("./models/BookSchema");

const userRoutes = require("./route/UserRoutes");
const booksIssue = require("./route/BooksIssue");

const app = express();
app.use(express.json());

async function main() {
  app.listen(process.env.PORT, () => {
    console.log("Server Listening at port 3000...");
  });
  await mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Connected!");
    })
    .catch((error) => {
      console.log("error while connecting");
    }); 
}

app.get("/", async (req, res) => {
  return res.send("Hii there this side Sourav");
});

// a route for sign in
app.use("/user", userRoutes);

app.use("/", booksIssue);
// a route for adding books by librarian

main(); // Main Function
