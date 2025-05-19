const express = require("express");
const router = express.Router();
const {
  addpermission,
  getpermission,
} = require("../controller/adminAddpermisson");
const { authMiddleware } = require("../middleware/authmiddleware");
const { onlyAdmin } = require("../middleware/adminmiddleware");
const roleController = require("../controller/role");

// Create a new permission
router.post("/addpermission", authMiddleware, addpermission);
router.get("/getpermission", authMiddleware, onlyAdmin, getpermission);

// make and get a role routes
router.post("/storeRole", authMiddleware, onlyAdmin, roleController.CreateRole);
router.get("/getRole", authMiddleware, onlyAdmin, roleController.getRole);

// admin create user

module.exports = router;
