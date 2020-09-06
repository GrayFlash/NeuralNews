var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var mongoose = require("mongoose");
var app = express();
var passport = require("passport");
var User = require("./models/user");
var Comment = require("./models/comments");
var NewsId = require("./models/newsId");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var news_data = require("./public/json/news_data.json");
var methodOverride = require("method-override");
var seedDB = require("./seed");

seedDB();

mongoose.connect('mongodb://localhost:27017/Neural_News', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

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
    NewsId.findOne({ id: req.params.id }).populate("comments").exec(function (err, news) {
        if (err)
            console.log(err);
        else {
            res.render("news.ejs", { info: news_data, id: req.params.id, news: news, NewsId: NewsId });
        }
    });

});



// -------------------- Comment Routes --------------------

app.get("/news/:id/comments/new", isLoggedIn, function (req, res) {
    NewsId.findOne({ id: req.params.id }, function (err, news) {
        if (err)
            console.log(err);
        else {
            res.render("newcomments.ejs", { news: news });
        }
    })

});


app.post("/news/:id/comments", isLoggedIn, function (req, res) {
    NewsId.findOne({ id: req.params.id }, function (err, news) {
        if (err)
            console.log(err);
        else {
            Comment.create(req.body.Text, function (err, comment) {
                if (err) {
                    console.log(err);
                }
                else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save()
                    news.comments.push(comment);
                    news.save();
                    res.redirect("/news/" + req.params.id);
                }
            });

        }
    });
});



// ----------------------- Upvote and Downvote -----------------------

app.put("/news/:id/upvote", function (req, res) {
    NewsId.findOneAndUpdate({ id: req.params.id }, {
        $inc: { "upvote": 1 }
    }, function (err, news) {
        if (err)
            console.log(err);
        else {
            res.redirect("/news/" + req.params.id);
        }
    });

});

app.put("/news/:id/downvote", function (req, res) {
    NewsId.findOneAndUpdate({ id: req.params.id }, {
        $inc: { "downvote": -1 }
    }, function (err, news) {
        if (err)
            console.log(err);
        else {
            res.redirect("/news/" + req.params.id);
        }
    });

});









function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server Has Started!!");
});