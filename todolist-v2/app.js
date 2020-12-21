//jshint esversion:6

const express = require("express");
const _ = require('lodash');
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

// mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/todoDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// mongoose.set('useFindAndModify', false);

const todoSchema = mongoose.Schema({
  "name": String
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

const listSchema = mongoose.Schema({
  name: String,
  items: [todoSchema]
});

const List = mongoose.model('List', listSchema);

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/:customListName', function (req, res) {
  customListName = _.camelCase(req.params.customListName);

  List.findOne({name: customListName}, function(err, foundList) {
    if (!err) {
      if (!foundList) {
        //create the default list
        const customList = new List({
          name: customListName,
          items: defaultItems
        });
        customList.save();
        setTimeout(()=> res.redirect("/" + customListName), 500);
      } else {
        //show existing list
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items
        });
      }
    }
  });
})

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
        res.render("list", {
          listTitle: "Today",
          newListItems: foundItems
        });
      }
    }
  });
});

app.post("/", function(req, res) {

  const item = req.body.newItem;
  const listName = req.body.list;

  newTodo = new Todo({
    name: item
  });

  if (listName === "Today") {
    newTodo.save(function(err) {
      if (err)
        console.log(err);
      else
        res.redirect("/");
    });
  } else {
    newList = List.findOneAndUpdate({name: listName},
      {$push: {items: newTodo}}, function(err) {
        if (!err)
          res.redirect("/" + listName)
      });
    // newList = List.findOne({name: listName}, function(err, listFound) {
    //   if (!err) {
    //     listFound.items.push(newTodo);
    //     listFound.save();
    //     res.redirect("/" + listName);
    //   }
    // })
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

app.post("/delete", function(req, res) {
  listTitle = req.body.list
  itemId = req.body.checkbox

  if (listTitle === "Today") {
    Todo.findByIdAndRemove({_id:itemId}, function(err) {
      if (!err) {
        console.log("Item of ID " + itemId + " is removed successfully.")
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate({name: listTitle},
      {$pull: {items: {_id:itemId}}}, function(err) {
        if (!err) {
          console.log("Item of ID " + itemId + " is removed successfully.")
          res.redirect("/" + listTitle);
        }
      });
  }
})
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
