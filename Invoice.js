const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    invoiceNumber: { type: String, unique: true },
    amount: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "paid", "overdue", "cancelled"], default: "pending" },
    dueDate: { type: Date },
    paidAt: { type: Date },
    paymentMethod: { type: String },
  },
  { timestamps: true }
);

invoiceSchema.pre("save", async function (next) {
  if (!this.invoiceNumber) {
    const count = await this.constructor.countDocuments();
    this.invoiceNumber = `INV-${String(count + 1).padStart(5, "0")}`;
  }
  next();
});

module.exports = mongoose.model("Invoice", invoiceSchema);
