const express = require("express");
const router = express.Router();
const {
  getVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle,
  updateVehicleLocation,
} = require("../controllers/fleetController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.use(protect);

router.route("/").get(getVehicles).post(authorize("admin"), addVehicle);
router
  .route("/:id")
  .put(authorize("admin"), updateVehicle)
  .delete(authorize("admin"), deleteVehicle);
router.put("/:id/location", authorize("driver", "admin"), updateVehicleLocation);

module.exports = router;
