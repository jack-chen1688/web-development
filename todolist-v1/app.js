const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();

const items = [];
const workItems = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  currentDate = date.getDate()
  res.render("list", {listTitle: currentDate, items: items});
});

app.post("/", function(req, res) {
  const todo = req.body.todo;
  items.push(todo);
  res.redirect("/");
});

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work List", items: workItems})
});

app.post("/work", function(req, res) {
  const todo = req.body.todo;
  console.log(req.body)
  workItems.push(todo);
  res.redirect("/work");
});

app.get("/about", function(req, res) {
  res.render('about');
});

app.listen(3000, function() {
  console.log("Server started on part 3000");
});
