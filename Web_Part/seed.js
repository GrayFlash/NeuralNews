var mongoose = require("mongoose");
var NewsId = require("./models/newsId");
var Comment = require("./models/comments");

var data = [];
for (var i = 0; i < 12; i++) {
    data[i] = {
        id: i,
        upvote: 0,
        downvote: 0
    }
}

function seedDB() {
    //Remove all campgrounds
    NewsId.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        Comment.remove({}, function (err) {
            if (err) {
                console.log(err);
            }
            data.forEach(function (seed) {
                NewsId.create(seed, function (err, news) {
                    if (err) {
                        console.log(err)
                    } else {

                        // Comment.create(
                        //     {
                        //         text: "This place is great, but I wish there was internet",
                        //         author: "Homer"
                        //     }, function (err, comment) {
                        //         if (err) {
                        //             console.log(err);
                        //         } else {
                        //             campground.comments.push(comment);
                        //             campground.save();
                        //             console.log("Created new comment");
                        //         }
                        //     });
                    }
                });
            });
        });
    });
    //add a few comments
}

module.exports = seedDB;