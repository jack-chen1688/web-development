const express = require("express");
const app = express();

app.get("/", function(req, res) {
  res.send("<h1>Hello World!</h1>");
});

app.get("/contact", function(req, res) {
  res.send("Contact me at xuehua@gmail.com.");
});

app.get("/about", function(req, res) {
  res.send("This is my express test page.");
});

app.get("/hobbies", function(req, res) {
  res.send("<ul><li>Skating</li><li>Go</li></ul>")
})
app.listen(3000, function() {
  console.log("Listen at port 3000.");
});
