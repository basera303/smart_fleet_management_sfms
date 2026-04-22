const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    plateNumber: { type: String, required: true, unique: true },
    type: {
      type: String,
      enum: ["sedan", "suv", "truck", "van", "bus"],
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "booked", "maintenance", "inactive"],
      default: "available",
    },
    dailyRate: { type: Number, required: true },
    capacity: { type: Number, default: 5 },
    fuelType: { type: String, enum: ["petrol", "diesel", "electric", "hybrid"], default: "petrol" },
    mileage: { type: Number, default: 0 },
    assignedDriver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    currentLocation: {
      type: { type: String, default: "Point" },
      coordinates: [Number],
    },
    lastSeen: { type: Date },
    images: [String],
    features: [String],
    insuranceExpiry: { type: Date },
    lastServiceDate: { type: Date },
  },
  { timestamps: true }
);

vehicleSchema.index({ currentLocation: "2dsphere" });

module.exports = mongoose.model("Vehicle", vehicleSchema);
