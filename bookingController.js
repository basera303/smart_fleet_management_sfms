const Booking = require("../models/Booking");
const Vehicle = require("../models/Vehicle");

// @desc    Create booking
// @route   POST /api/bookings
// @access  Private (Customer)
const createBooking = async (req, res) => {
  try {
    const { vehicleId, pickupLocation, dropoffLocation, startDate, endDate } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle || vehicle.status !== "available") {
      return res.status(400).json({ success: false, message: "Vehicle not available" });
    }

    const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    const totalAmount = days * vehicle.dailyRate;

    const booking = await Booking.create({
      customer: req.user.id,
      vehicle: vehicleId,
      pickupLocation,
      dropoffLocation,
      startDate,
      endDate,
      totalAmount,
    });

    vehicle.status = "booked";
    await vehicle.save();

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all bookings (admin) or user's bookings
// @route   GET /api/bookings
// @access  Private
const getBookings = async (req, res) => {
  try {
    const query = req.user.role === "admin" ? {} : { customer: req.user.id };
    const bookings = await Booking.find(query)
      .populate("vehicle", "make model plateNumber")
      .populate("customer", "name email")
      .populate("driver", "name phone")
      .sort({ createdAt: -1 });

    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("vehicle")
      .populate("customer", "name email phone")
      .populate("driver", "name phone licenseNumber");

    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private (Admin)
const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Cancel booking
// @route   DELETE /api/bookings/:id
// @access  Private
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    if (booking.customer.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    booking.status = "cancelled";
    await booking.save();

    await Vehicle.findByIdAndUpdate(booking.vehicle, { status: "available" });

    res.json({ success: true, message: "Booking cancelled" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createBooking, getBookings, getBooking, updateBookingStatus, cancelBooking };
