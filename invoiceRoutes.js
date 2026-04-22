const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const Invoice = require("../models/Invoice");
const Booking = require("../models/Booking");

// @desc  Get all invoices
router.get("/", protect, async (req, res) => {
  try {
    const query = req.user.role === "admin" ? {} : { customer: req.user.id };
    const invoices = await Invoice.find(query)
      .populate("booking", "startDate endDate pickupLocation dropoffLocation")
      .populate("customer", "name email")
      .sort({ createdAt: -1 });
    res.json({ success: true, count: invoices.length, data: invoices });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc  Get single invoice
router.get("/:id", protect, async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate("booking")
      .populate("customer", "name email phone");
    if (!invoice) return res.status(404).json({ success: false, message: "Invoice not found" });
    res.json({ success: true, data: invoice });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc  Generate invoice for a booking
router.post("/generate/:bookingId", protect, authorize("admin"), async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    const tax = booking.totalAmount * 0.18; // 18% GST
    const totalAmount = booking.totalAmount + tax;

    const invoice = await Invoice.create({
      booking: booking._id,
      customer: booking.customer,
      amount: booking.totalAmount,
      tax,
      totalAmount,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    res.status(201).json({ success: true, data: invoice });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc  Mark invoice as paid
router.put("/:id/pay", protect, authorize("admin"), async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      { status: "paid", paidAt: new Date(), paymentMethod: req.body.paymentMethod || "cash" },
      { new: true }
    );
    if (!invoice) return res.status(404).json({ success: false, message: "Invoice not found" });
    res.json({ success: true, data: invoice });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
