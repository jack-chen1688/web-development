const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const items = [];
const workItems = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  // var today = new Date(2020,12,7)
  const today = new Date();
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }

  const date = today.toLocaleDateString("en-us", options);
  res.render("list", {listTitle: date, items: items});
});

app.post("/", function(req, res) {
  const todo = req.body.todo;
  items.push(todo);
  res.redirect("/");
});

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work", items: workItems})
});

app.post("/work", function(req, res) {
  const todo = req.body.todo;
  workItems.push(todo);
  res.redirect("/work");
})

app.listen(3000, function() {
  console.log("Server started on part 3000");
})
