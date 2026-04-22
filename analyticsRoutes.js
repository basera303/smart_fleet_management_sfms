const express = require("express");
const router = express.Router();
const { getDashboardStats, getMonthlyRevenue, getFleetUtilization } = require("../controllers/analyticsController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.use(protect, authorize("admin"));

router.get("/dashboard", getDashboardStats);
router.get("/revenue", getMonthlyRevenue);
router.get("/utilization", getFleetUtilization);

module.exports = router;
