const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

main().catch((err) => console.log(err));

async function main() {
  app.get("/", (req, res) => {
    res.render("index");
  });

  app.post("/", (req, res) => {});

  app.get("/gallery", (req, res) => {
    res.render("gallery");
  });

  app.listen(3000, () => {
    console.log("Server has started on port 3000");
  });
}
