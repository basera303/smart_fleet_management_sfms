const express = require("express");
const router = express.Router();
const { register, login, confirmEmail, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/confirm-email/:token", confirmEmail);
router.get("/me", protect, getMe);

module.exports = router;
