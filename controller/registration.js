const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.registration = async (req, res) => {
  try {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ message: error.array()[0].msg });
    }

    //
    const { username, email, password } = req.body;

    const isexist = await userModel.findOne({ email: req.body.email });
    if (isexist) {
      return res.status(400).json({ message: "User already exist" });
    }
    const haspassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username,
      email,
      password: haspassword,
      role: req.body.role ? req.body.role : 0,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        username: user.username,
        email: user.email,
      },
      "secret"
    );
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getprofile = async (req, res) => {
  try {
    const user = await userModel.find({});
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
