const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/wikiDB', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.get("/", function(req, res) {
  res.send("Hello World")
});

app.listen(3000, function() {
  console.log("Started service at port 3000");
});
