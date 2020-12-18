//jshint esversion:6

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const workItems = [];

mongoose.connect('mongodb://localhost:27017/todoDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const todoSchema = mongoose.Schema({
  "name": {
    type: String,
    required: [true, "The name of todo cannot be empty"]
  }
});

const Todo = mongoose.model('Todo', todoSchema);
const item0 = new Todo({
  name: "Buy Food"
});
const item1 = new Todo({
  name: "Cook Food"
});
const item2 = new Todo({
  name: "Eat Food"
});
const defaultItems = [item0, item1, item2];

app.get("/", function(req, res) {

  Todo.find({}, function(err, foundItems) {
    if (err) {
      console.log(err);
    } else {
      console.log("found " + foundItems.length + " items.")
      if (foundItems.length === 0) {
        Todo.insertMany(defaultItems, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Successfully inserted default todo items");
          }
        });
        console.log("redirect")
        setTimeout(()=>res.redirect("/"), 500);
      } else {
        const day = date.getDate();
        res.render("list", {
          listTitle: day,
          newListItems: foundItems
        });
      }
    }
  });
});

app.post("/", function(req, res) {

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
