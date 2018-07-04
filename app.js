var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  var campgrounds = [
    {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7381/9705573948_3f342901d1.jpg"},
    {name: "Granite Hill", image: "https://farm1.staticflickr.com/82/225912054_690e32830d.jpg"},
    {name: "Crantock Bay", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"}
  ]

  res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(res, req) {
  //get data from form and add to campgrounds array

  //redirect back to campgrounds page
});

//Tell express to listen for requests
app.listen(3000, function(){
  console.log("Server started.");
});
