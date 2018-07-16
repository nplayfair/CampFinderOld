var express     = require("express");
var router      = express.Router({mergeParams: true});
var Campground  =  require("../models/campground");
var Comment  =  require("../models/comment");

//New Comment
router.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if(err) {
      console.log(err);
    }
    else {
      res.render("comments/new", {campground: campground});
    }
  });
});

//Comments create
router.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
  //Look up campground using id
    Campground.findById(req.params.id, function(err, campground) {
      if(err) {
        console.log(err);
        res.redirect("/campgrounds");
      }
      else {
        Comment.create(req.body.comment, function(err, comment) {
          if(err) {
            console.log(err);
          }
          else {
            //Add username and id to comment
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            //Save commment
            comment.save();
            campground.comments.push(comment);
            campground.save();
            res.redirect("/campgrounds/" + campground._id);
          }
        });
      }
    });
});

//Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
