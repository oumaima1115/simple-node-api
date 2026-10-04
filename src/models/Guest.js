const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    reservation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reservation",
        required: true
    }
});

module.exports = mongoose.model("Guest", guestSchema);