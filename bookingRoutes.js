const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookings,
  getBooking,
  updateBookingStatus,
  cancelBooking,
} = require("../controllers/bookingController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.use(protect);

router.route("/").get(getBookings).post(createBooking);
router.route("/:id").get(getBooking).delete(cancelBooking);
router.put("/:id/status", authorize("admin"), updateBookingStatus);

module.exports = router;
