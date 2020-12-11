const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  query = req.body.cityName;
  apiKey = "35a326f9cae8127568c3b65082cbcb68";
  url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric";

  https.get(url, function(response) {
    response.on('data', function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon
      const iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write('<p>The weather is currently ' + description + ' </p>');
      res.write('<h1>Temperature in ' + query + ' is ' +  temp  + ' celsius.<h1>');
      res.write('<img src="' + iconURL + '">');

      res.send();
    });
  });
});

app.listen(3000, function() {
  console.log("server is started at port 3000");
});
