const express = require("express");
const bodyParser = require("body-parser");
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
  res.send("post received");
})

app.listen(3000, function() {
  console.log("Listening at port 3000.")
})
