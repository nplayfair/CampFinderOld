var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");

var data = [
  {
    name: "Cloud's Rest",
    image: "/images/cloudsrest.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    name: "California Mesa",
    image: "/images/californiamesa.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    name: "Canyon Creek",
    image: "/images/canyoncreek.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    name: "Crantock Bay",
    image: "/images/crantockbay.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  }

]

function seedDB() {
  //Remove all campgrounds from db
  Campground.remove({}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("removed campgrounds");
      //Add some campgrounds
      data.forEach(function(seed) {
        Campground.create(seed, function(err, campground) {
          if(err) {
            console.log(err);
          }
          else {
            console.log("Added a campground");
            //Create comment for campground
            Comment.create(
              {
                text: "Awesome campground!",
                author: "Jess"
              }, function(err, comment) {
                if(err) {
                  console.log(err);
                }
                else {
                  campground.comments.push(comment);
                  campground.save();
                  console.log("created comment");
                }
              });
          }
        });
      });
    }
  });

  //Add some comments
}

module.exports = seedDB;
