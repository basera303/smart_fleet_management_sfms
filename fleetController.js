const Vehicle = require("../models/Vehicle");

// @desc    Get all vehicles
// @route   GET /api/fleet
// @access  Private
const getVehicles = async (req, res) => {
  try {
    const { status, type, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;

    const vehicles = await Vehicle.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Vehicle.countDocuments(filter);

    res.json({ success: true, total, pages: Math.ceil(total / limit), data: vehicles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add vehicle
// @route   POST /api/fleet
// @access  Private (Admin)
const addVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json({ success: true, data: vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update vehicle
// @route   PUT /api/fleet/:id
// @access  Private (Admin)
const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });
    res.json({ success: true, data: vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete vehicle
// @route   DELETE /api/fleet/:id
// @access  Private (Admin)
const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });
    res.json({ success: true, message: "Vehicle removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update vehicle location (from driver/IoT)
// @route   PUT /api/fleet/:id/location
// @access  Private (Driver)
const updateVehicleLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { currentLocation: { type: "Point", coordinates: [longitude, latitude] }, lastSeen: new Date() },
      { new: true }
    );
    res.json({ success: true, data: vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getVehicles, addVehicle, updateVehicle, deleteVehicle, updateVehicleLocation };
