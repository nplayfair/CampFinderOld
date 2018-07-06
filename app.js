var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/campfinder", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Granite Hill",
//     image: "https://farm1.staticflickr.com/82/225912054_690e32830d.jpg",
//   },
//   function(err, camp) {
//     if(err) {
//       console.log(err);
//     }
//     else {
//       console.log("newly created campground:");
//       console.log(camp);
//     }
//   })

// var campgrounds = [
//   {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7381/9705573948_3f342901d1.jpg"},
//   {name: "Granite Hill", image: "https://farm1.staticflickr.com/82/225912054_690e32830d.jpg"},
//   {name: "Crantock Bay", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
//   {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7381/9705573948_3f342901d1.jpg"},
//   {name: "Granite Hill", image: "https://farm1.staticflickr.com/82/225912054_690e32830d.jpg"},
//   {name: "Crantock Bay", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"}
// ];

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  // get all campgrounds from db
  Campground.find({}, function(err, allCampgrounds) {
    if(err) {
      console.log(err);
    }
    else {
      res.render("campgrounds", {campgrounds: allCampgrounds});
    }
  });
});

app.post("/campgrounds", function(req, res) {
  //get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image}
  // Create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated) {
    if(err) {
      console.log(err);
    }
    else {
      //redirect back to campgrounds page
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs");
});

//Tell express to listen for requests
app.listen(3000, function(){
  console.log("Server started.");
});
