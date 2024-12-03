const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

function main() {
  app.listen(3000, () => {
    console.log("Server Listening at port 3000...");
  });

  mongoose
    .connect(
      "mongodb+srv://subh:nainasweetheart@cluster0.nzujy.mongodb.net/Library-Management"
    )
    .then(() => {
      console.log("Connected!");
    })
    .catch((error) => {
      console.log("error while connecting");
    });
}

app.get("/", (req, res) => {
  res.send("Hii there this side Sourav");
});

main(); // Main Function
