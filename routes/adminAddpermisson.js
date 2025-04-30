const express = require("express");
const router = express.Router();
const {
  addpermission,
  getpermission,
} = require("../controller/adminAddpermisson");
const { authMiddleware } = require("../middleware/authmiddleware");
const { onlyAdmin } = require("../middleware/adminmiddleware");

router.post("/addpermission", authMiddleware, addpermission);
router.get("/getpermission", authMiddleware, onlyAdmin, getpermission);

module.exports = router;
