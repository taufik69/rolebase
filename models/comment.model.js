const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commnetSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  postid: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  comment: {
    type: String,
  },
});
module.exports = mongoose.model("Commnet", commnetSchema);
