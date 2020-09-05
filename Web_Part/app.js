var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var mongoose = require("mongoose");
var app = express();
var passport = require("passport");
var User = require("./models/user");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var news_data = require("./public/json/news_data.json");


mongoose.connect('mongodb://localhost:27017/Neural_News', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


//------------- Initialising passport ----------------

app.use(require("express-session")({
    secret: "This the secret message for authentication",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});





//------------------------   Authentication Routes  ------------------------- 

app.get("/login", function (req, res) {
    res.render("login.ejs");
});
app.get("/signup", function (req, res) {
    res.render("signup.ejs");
});

app.post("/signup", function (req, res) {
    User.register(
        new User({
            username: req.body.username,
            name: req.body.name,
            phone: req.body.phone
        }),
        req.body.password, function (err, user) {

            if (err) {
                console.log(err);
            }
            passport.authenticate("local")(req, res, function () {
                res.redirect("/");
            });
        });
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}), function (req, res) {
});
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

// ------------------------ Authentication Ends ------------------------------




app.get("/", function (req, res) {
    res.render("home.ejs", { info: news_data });
});

app.get("/user", function (req, res) {
    res.render("user_profile.ejs");
});

app.get("/news/:id", function (req, res) {
    res.render("news.ejs", { info: news_data, id: req.params.id });
});




var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server Has Started!!");
});