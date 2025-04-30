const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  role: {
    type: Number,
    default: 0, // 0 = user, 1 = admin 2 = sub admin 3 = editor
  },
});

module.exports = mongoose.model("User", userSchema);
