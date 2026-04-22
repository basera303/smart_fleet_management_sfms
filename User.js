const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false, minlength: 6 },
    role: {
      type: String,
      enum: ["customer", "driver", "admin"],
      default: "customer",
    },
    phone: { type: String },
    profilePicture: { type: String },
    isEmailVerified: { type: Boolean, default: false },
    emailToken: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("User", userSchema);
