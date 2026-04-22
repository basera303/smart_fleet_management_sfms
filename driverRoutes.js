const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const User = require("../models/User");
const Booking = require("../models/Booking");

// @desc  Get all drivers
router.get("/", protect, authorize("admin"), async (req, res) => {
  try {
    const drivers = await User.find({ role: "driver" }).select("-password");
    res.json({ success: true, count: drivers.length, data: drivers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc  Get driver by ID
router.get("/:id", protect, async (req, res) => {
  try {
    const driver = await User.findOne({ _id: req.params.id, role: "driver" }).select("-password");
    if (!driver) return res.status(404).json({ success: false, message: "Driver not found" });
    res.json({ success: true, data: driver });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc  Assign driver to booking
router.put("/:driverId/assign/:bookingId", protect, authorize("admin"), async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.bookingId,
      { driver: req.params.driverId, status: "confirmed" },
      { new: true }
    ).populate("driver", "name phone");
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    res.json({ success: true, data: booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc  Get driver's active bookings
router.get("/:id/bookings", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ driver: req.params.id })
      .populate("vehicle", "make model plateNumber")
      .populate("customer", "name phone")
      .sort({ createdAt: -1 });
    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
