const role = require("../models/role.mode");
const redis = require("../config/redis");

exports.CreateRole = async (req, res) => {
  try {
    const { roleName, value } = req.body;

    if (!roleName) {
      return res.status(400).json({ message: "Role name is required" });
    }
    if (value > 5 || value < 0) {
      return res.status(400).json({ message: "Value is 0 to 4" });
    }

    const newRole = await role.create({
      roleName,
      value,
    });

    if (newRole) {
      return res.status(201).json({
        message: "Role created successfully",
        data: newRole,
      });
    }
  } catch (error) {
    console.error("Error creating role:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// get all role
exports.getRole = async (req, res) => {
  try {
    // Check if roles are cached in Redis
    const cachedRoles = await redis.get("roles");
    if (cachedRoles) {
      return res.status(200).json({
        message: "All roles",
        data: JSON.parse(cachedRoles),
      });
    }
    // If not cached, fetch from the database

    const roles = await role
      .find({ value: { $ne: 1 } })
      .select("roleName value createdAt updatedAt ");
    if (!roles || roles.length === 0) {
      return res.status(404).json({
        message: "No roles found",
      });
    }
    // Cache the roles in Redis
    await redis.set("roles", JSON.stringify(roles), { EX: 36 }); // Ex means 36 seconds
    const haveTime = await redis.ttl("roles");
    console.log("Cache time remaining:", haveTime);

    if (roles) {
      return res.status(200).json({
        message: "All roles",
        data: roles,
      });
    }
  } catch (error) {
    console.error("Error fetching roles:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
