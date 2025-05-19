const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const likeSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  postid: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
});
module.exports = mongoose.model("Like", likeSchema);
