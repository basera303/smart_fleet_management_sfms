const Booking = require("../models/Booking");
const Vehicle = require("../models/Vehicle");
const User = require("../models/User");
const Invoice = require("../models/Invoice");

// @desc    Get dashboard stats
// @route   GET /api/analytics/dashboard
// @access  Private (Admin)
const getDashboardStats = async (req, res) => {
  try {
    const [totalBookings, activeBookings, totalVehicles, availableVehicles, totalDrivers, revenueData] =
      await Promise.all([
        Booking.countDocuments(),
        Booking.countDocuments({ status: "active" }),
        Vehicle.countDocuments(),
        Vehicle.countDocuments({ status: "available" }),
        User.countDocuments({ role: "driver" }),
        Invoice.aggregate([
          { $match: { status: "paid" } },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ]),
      ]);

    res.json({
      success: true,
      data: {
        totalBookings,
        activeBookings,
        totalVehicles,
        availableVehicles,
        totalDrivers,
        totalRevenue: revenueData[0]?.total || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get monthly revenue
// @route   GET /api/analytics/revenue
// @access  Private (Admin)
const getMonthlyRevenue = async (req, res) => {
  try {
    const data = await Invoice.aggregate([
      { $match: { status: "paid" } },
      {
        $group: {
          _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
          revenue: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get fleet utilization
// @route   GET /api/analytics/utilization
// @access  Private (Admin)
const getFleetUtilization = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({}, "make model status type");
    const stats = vehicles.reduce((acc, v) => {
      acc[v.status] = (acc[v.status] || 0) + 1;
      return acc;
    }, {});
    res.json({ success: true, data: { vehicles, stats } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getDashboardStats, getMonthlyRevenue, getFleetUtilization };
