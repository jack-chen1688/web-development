const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect('mongodb://localhost:27017/wikiDB', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

articleSchema = mongoose.Schema({
  title: String,
  content: String
});

Article = mongoose.model('Article', articleSchema);

app.route("/articles")
.get(function(req, res) {
  Article.find({}, function(err, articles) {
    if (!err)
      res.send(articles);
    else
      res.send(err);
  });
})

.post(function(req, res) {
  console.log(req.body.title)
  console.log(req.body.content)
  article = new Article({
    title: req.body.title, content: req.body.content});
  article.save(function(err) {
    if (!err)
      res.send("Successfully added a new article.");
    else
      res.send(err);
  });
})

.delete(function(req, res) {
  Article.deleteMany(function(err) {
    if (!err)
      res.send("Successfully deleted all articles")
    else
      res.send(err);
  })
});

app.route("/articles/:title")
.get(function(req, res) {
  title = req.params.title;
  Article.findOne({title: title}, function(err, foundArticle) {
    if (!err)
      if (foundArticle)
        res.send(foundArticle);
      else
        res.send("No matching articles found!");
  });
});

.put(function(req, res) {
  title = req.params.title;
  Article.findOne
});

app.listen(3000, function() {
  console.log("Started service at port 3000");
});
