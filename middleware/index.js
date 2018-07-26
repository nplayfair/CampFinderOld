// Middleware
var Campground  = require("../models/campground");
var Comment  = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id).exec(function(err, foundCampground) {
      if(err) {
        console.log(err);
        res.redirect("back");
      }
      else {
        //does user own the campground?
        if (foundCampground.author.id.equals(req.user._id)) {
          next();
        }
        else {
          res.redirect("back");
        }
      }
    });
  }
  else {
    res.redirect("back");
  }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id).exec(function(err, foundComment) {
      if(err) {
        console.log(err);
        res.redirect("back");
      }
      else {
        //does user own the comment?
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        }
        else {
          res.redirect("back");
        }
      }
    });
  }
  else {
    res.redirect("back");
  }
}

middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please log in first");
  res.redirect("/login");
}

module.exports = middlewareObj;
