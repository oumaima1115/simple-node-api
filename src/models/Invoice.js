const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
    reservation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reservation",
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["unpaid", "paid"],
        default: "unpaid"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model("Invoice", invoiceSchema);
