const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"SFMS Support" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log("📧 Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email error:", error.message);
    throw error;
  }
};

const sendBookingConfirmation = (to, booking) =>
  sendEmail({
    to,
    subject: "Your SFMS Booking is Confirmed!",
    html: `
      <h2>Booking Confirmed ✅</h2>
      <p>Your booking <strong>#${booking._id}</strong> has been confirmed.</p>
      <p><strong>Pickup:</strong> ${booking.pickupLocation}</p>
      <p><strong>Drop-off:</strong> ${booking.dropoffLocation}</p>
      <p><strong>From:</strong> ${new Date(booking.startDate).toDateString()}</p>
      <p><strong>To:</strong> ${new Date(booking.endDate).toDateString()}</p>
      <p><strong>Total:</strong> ₹${booking.totalAmount}</p>
    `,
  });

module.exports = { sendEmail, sendBookingConfirmation };
