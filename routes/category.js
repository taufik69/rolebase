const express = require("express");

const router = express.Router();

const { authMiddleware } = require("../middleware/authmiddleware");
const { onlyAdmin } = require("../middleware/adminmiddleware");
const Category = require("../controller/category");

router.post("/create", authMiddleware, onlyAdmin, Category.CreateCategory);
router.get("/getCategory", authMiddleware, Category.getCategory);

module.exports = router;
