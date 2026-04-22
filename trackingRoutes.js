const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const Vehicle = require("../models/Vehicle");
const Booking = require("../models/Booking");

// @desc  Get live location of a vehicle
router.get("/vehicle/:id", protect, async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).select(
      "currentLocation lastSeen plateNumber make model status"
    );
    if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });
    res.json({ success: true, data: vehicle });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc  Get live location by booking ID (for customers)
router.get("/booking/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "vehicle",
      "currentLocation lastSeen make model plateNumber"
    );
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    // Only allow the booking owner or admin
    if (
      booking.customer.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    res.json({ success: true, data: booking.vehicle });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc  Get all active vehicles with locations (for admin map view)
router.get("/all-active", protect, async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ status: "booked" }).select(
      "currentLocation lastSeen make model plateNumber assignedDriver"
    ).populate("assignedDriver", "name phone");
    res.json({ success: true, count: vehicles.length, data: vehicles });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
