const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserpermissionSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  permisson: [
    {
      permissonName: String,
      permissionValue: [Number],
    },
  ],
});
module.exports = mongoose.model("userPermission", UserpermissionSchema);
