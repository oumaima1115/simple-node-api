const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
    required: true
  },
  reservationDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending"
  }
});

module.exports = mongoose.model("Reservation", reservationSchema);

// User ↔ Reservation: one‑to‑many
// Table ↔ Reservation: one‑to‑many
// User ↔ Table (through Reservation): many‑to‑many