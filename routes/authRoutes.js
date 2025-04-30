const express = require("express");
const router = express.Router();
const authController = require("../controller/registration");
const {
  registrationValidation,
  loginValidation,
} = require("../helpers/registrationValidation");
const { authMiddleware } = require("../middleware/authmiddleware");

router.post("/register", registrationValidation, authController.registration);
router.get("/login", loginValidation, authController.login);

router.get("/getProfile", authMiddleware, authController.getprofile);

module.exports = router;
