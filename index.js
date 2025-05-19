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
app.use("/category", require("./routes/category"));
const postRoutes = require("./routes/post");
app.use("/post", postRoutes);
app.use("/user", require("./routes/createUser"));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  mongoose
    .connect(
      `mongodb+srv://taufikcitbd:fsl60IRzP7w4r1N8@cluster0.xtxt8.mongodb.net/role`
    )
    .then(() => console.log("Database  connected"))
    .then(() =>
      // add resis
      require("./config/redis")
    );
});
