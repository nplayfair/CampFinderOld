require('dotenv').config();
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    flash           = require("connect-flash"),
    Campground      = require("./models/campground"),
    LocalStrategy   = require("passport-local"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    methodOverride  = require("method-override"),
    seedDB          = require("./seeds")

//Require routes
var commentRoutes     = require("./routes/comments"),
    campgroundRoutes  = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index")

var dbUrl = process.env.DATABASEURL || "mongodb://127.0.0.1:27017/campfinder";

mongoose.connect(dbUrl, {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require('moment');
// seedDB();

//Passport config
app.use(require("express-session")({
  secret: "Perfect sound forever",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Middleware to run on every route, provides user var
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//Tell express to listen for requests
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Server started.");
});
