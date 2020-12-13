const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [
      {
        'update_exisiting': true,
        'email_address': email,
        'status':'subscribed',
        'merge_fields': {
          FNAME: firstName,
          LNAME: lastName
        },

      }
    ]
  }
  const jsonData = JSON.stringify(data);
  const url = "https://us2.api.mailchimp.com/3.0/lists/bb83853d04";
  const options = {
    method: "POST",
    auth: 'xuehua1:a4e674b673a55a7cbba5cd9e37e4486d9-us2',
  }

  req = https.request(url, options, function(response) {
    response.on('data', function(data) {
      jsonResponse = JSON.parse(data);
      if (response.statusCode == 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    });
  });

  req.write(jsonData);
  req.end();
});

app.listen(3000, function() {
  console.log("Listening at port 3000.")
});

// api key
// 4e674b673a55a7cbba5cd9e37e4486d9-us2
// list id/audience id
// bb83853d04
