const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const Authroutes = require("./routes/authRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/auth", Authroutes);
app.use("/admin", require("./routes/adminAddpermisson"));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  mongoose
    .connect(`mongodb://localhost:27017/role`)
    .then(() => console.log("connected"));
});
