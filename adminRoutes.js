const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const User = require("../models/User");

router.use(protect, authorize("admin"));

// @desc  Get all users
router.get("/users", async (req, res) => {
  try {
    const { role, page = 1, limit = 20 } = req.query;
    const filter = role ? { role } : {};
    const users = await User.find(filter)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });
    const total = await User.countDocuments(filter);
    res.json({ success: true, total, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc  Update user (activate/deactivate, change role)
router.put("/users/:id", async (req, res) => {
  try {
    const allowedFields = ["isActive", "role", "name", "phone"];
    const updates = {};
    allowedFields.forEach((f) => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc  Delete user
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
