var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds")

mongoose.connect("mongodb://127.0.0.1:27017/campfinder", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

// Campground.create(
//   {
//     name: "Granite Hill",
//     image: "https://farm1.staticflickr.com/82/225912054_690e32830d.jpg",
//     description: "This is a huge granite hill. Beautiful mountainside location."
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

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res) {
  // get all campgrounds from db
  Campground.find({}, function(err, allCampgrounds) {
    if(err) {
      console.log(err);
    }
    else {
      res.render("index", {campgrounds: allCampgrounds});
    }
  });
});

//CREATE - add new campground to db
app.post("/campgrounds", function(req, res) {
  //get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc}
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

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs");
});

//SHOW - show information about the specified campground
app.get("/campgrounds/:id", function(req, res) {
  //find the campground with the provided id
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if(err) {
      console.log(err);
    }
    else {
      // console.log(foundCampground);
      res.render("show", {campground: foundCampground});
    }
  });
})

//Tell express to listen for requests
app.listen(3000, function(){
  console.log("Server started.");
});
