var mongoose = require("mongoose");

var newsIdSchema = new mongoose.Schema({
    id: String,
    upvote: Number,
    downvote: Number,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});
module.exports = mongoose.model("NewsId", newsIdSchema);
