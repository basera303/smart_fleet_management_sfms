const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../utils/emailService");
const crypto = require("crypto");

// Generate JWT
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const emailToken = crypto.randomBytes(32).toString("hex");
    const user = await User.create({ name, email, password, role, emailToken });

    await sendEmail({
      to: email,
      subject: "Confirm your SFMS account",
      html: `<p>Click <a href="${process.env.CLIENT_URL}/confirm-email?token=${emailToken}">here</a> to verify your email.</p>`,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful. Please verify your email.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    if (!user.isEmailVerified) {
      return res.status(403).json({ success: false, message: "Please verify your email first" });
    }

    const token = generateToken(user._id);
    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Confirm email
// @route   GET /api/auth/confirm-email/:token
// @access  Public
const confirmEmail = async (req, res) => {
  try {
    const user = await User.findOne({ emailToken: req.params.token });
    if (!user) return res.status(400).json({ success: false, message: "Invalid token" });

    user.isEmailVerified = true;
    user.emailToken = undefined;
    await user.save();

    res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ success: true, data: user });
};

module.exports = { register, login, confirmEmail, getMe };
