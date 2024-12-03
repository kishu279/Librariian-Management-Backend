const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hii there this side Sourav"); 
});

app.listen(3000, () => {
  console.log("Server Listening at port 3000...");
});
