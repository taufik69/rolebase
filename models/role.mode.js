const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      default: 0,
      enum: [0, 1, 2, 3, 4], // 0 = user, 1 = admin 2 = sub admin 3 = editor 4 = viewer
    },
  },
  {
    timestamps: true,
  }
);

// roleSchema.virtual("users", {
//   ref: "User",
//   localField: "_id",
//   foreignField: "role",
// });

roleSchema.virtual("id").get(function () {
  return this._id.toString();
});
roleSchema.set("toJSON", {
  virtuals: true,
});
module.exports = mongoose.model("Role", roleSchema);
