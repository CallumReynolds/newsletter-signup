
//jshint esversion: 6

// Variables for requiring and storing modules
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

// Setup express
const app = express();

// Contains static files
app.use(express.static("public"));
// 'Uses' body parser
app.use(bodyParser.urlencoded({extended: true}));

// Gets the home page which targets __dirname(directory) and the dedicated html page
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

// Posts information from the home page
app.post("/", function(req, res) {

  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

// Batch sub/unsub list members, post request body
  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    // Requested url
    url: "https://us20.api.mailchimp.com/3.0/lists/e241142c8b",
    // Change method from GET to POST
    method: "POST",
    // HTTP Basic Authentication
    headers: {
      "Authorization": "callum1 93fd5321690e38704f24ea6566bb6a94-us20"
    },
    // Data that is being posted
    body: jsonData
  };

  // Call request function
  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }

  });

  console.log(firstName, lastName, email);

});

// Redirects to homepage
app.post("/failure", function(req, res) {
  res.redirect("/");
});

// 'Listens' on a specified port
// app.listen(process.env.PORT || 3000, function...)
app.listen(3000, function() {
  console.log("Server is up and running on port 3000.");
});

// 93fd5321690e38704f24ea6566bb6a94-us20

// e241142c8b
