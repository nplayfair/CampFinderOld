var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");

var data = [
  {
    name: "Cloud's Rest",
    image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    name: "California Mesa",
    image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    name: "Canyon Creek",
    image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    name: "Crantock Bay",
    image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
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
