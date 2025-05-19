const permissionModel = require("../models/permission.model");

exports.addpermission = async (req, res) => {
  try {
    const { permissionName, permissionValue } = req.body;
    const permission = await permissionModel.create({
      permissionName,
      permissionValue,
    });
    res.status(200).json(permission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getpermission = async (req, res) => {
  try {
    const permission = await permissionModel.find({});
    res.status(200).json(permission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
