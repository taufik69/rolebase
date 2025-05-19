const User = require("../models/user.model");
const redisClient = require("../config/redis");

exports.crateUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if the user already exists
    // const existingUser = await User.find({ email });
    // if (existingUser.length > 0) {
    //   return res.status(400).json({ message: "User already exists" });
    // }
    if (role === 1 && req.user.role == 1) {
      return res.status(403).json({ message: "Only admins can create  users" });
    }
    // Create a new user

    // const user = await User.create({
    //   username,
    //   email,
    //   password,
    //   role,
    // });
    // Send a welcome message to the user

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.user.role == 1) {
      return res.status(403).json({ message: "Only admins can view users" });
    }

    // Check if the user is in the cache
    const cachedUsers = await redisClient.get("users");
    if (cachedUsers) {
      return res.status(200).json({
        message: "Users fetched successfully",
        users: JSON.parse(cachedUsers),
      });
    }
    const users = await User.find();
    // Store the users in the cache
    await redisClient.set("users", JSON.stringify(users), {
      EX: 60 * 60, // Cache for 1 hour
    });
    res.status(200).json({ message: "Users fetched successfully", users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
