const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema({
  title: String,
  description: String,
  category: {
    type: Array,
  },
});
