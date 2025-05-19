const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authmiddleware");
const { onlyAdmin } = require("../middleware/adminmiddleware");
const userController = require("../controller/createUser");

router.post("/createuser", authMiddleware, onlyAdmin, userController.crateUser);
router.get("/getuser", authMiddleware, onlyAdmin, userController.getUser);

module.exports = router;
