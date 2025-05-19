const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const permissionSchema = new Schema({
  permissionName: String,
  permissionValue: [Number],
});
module.exports = mongoose.model("Permission", permissionSchema);
