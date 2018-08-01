var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground");
var middleware  = require("../middleware");
var multer      = require('multer');

var storage     = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

var upload = multer({ storage: storage, fileFilter: imageFilter});
var cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'dst95z3js',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

//INDEX - show all campgrounds
router.get("/", function(req, res) {
  // get all campgrounds from db
  Campground.find({}, function(err, allCampgrounds) {
    if(err) {
      console.log(err);
    }
    else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds});
    }
  });
});

//CREATE - add new campground to db
router.post("/", middleware.isLoggedIn, upload.single('image'), function(req, res) {

  cloudinary.v2.uploader.upload(req.file.path, function(error, result) {
    // Add cloudinary url for the image to the campground object under image property
    req.body.campground.image = result.secure_url;
    // Add author to campground
    req.body.campground.author = {
      id: req.user._id,
      username: req.user.username
    }
    Campground.create(req.body.campground, function(err, campground) {
      if (err) {
        req.flash('error', err.message);
        return res.redirect('back');
      }
      res.redirect('/campgrounds/' + campground.id);
    });
  });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});

//SHOW - show information about the specified campground
router.get("/:id", function(req, res) {
  //find the campground with the provided id
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if(err || !foundCampground) {
      req.flash("error", "Campground not found");
      res.redirect("/campgrounds");
    }
    else {
      // console.log(foundCampground);
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

//EDIT - show form to edit a campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findById(req.params.id).exec(function(err, foundCampground) {
    res.render("campgrounds/edit", {campground: foundCampground});
  });
});

//UPDATE - update a campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
  //Find and update the correct campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
    if(err) {
      res.redirect("/campgrounds");
    }
    else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//DESTROY - delete a campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if(err) {
      res.redirect("/campgrounds");
    }
    else {
      res.redirect("/campgrounds");
    }
  });
});

module.exports = router;
