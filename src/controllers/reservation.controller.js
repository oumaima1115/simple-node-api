const Reservation = require("../models/Reservation");
const Guest = require("../models/Guest");
const Invoice = require("../models/Invoice");

exports.createReservation = async (req, res) => {
    try {
        const reservation = await Reservation.create(req.body);
        res.status(201).json(reservation);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getReservations = async (req, res) => {
    const reservations = await Reservation.find()
        .populate("user") // Populate means to replace the user field with the actual user document from the User collection
        .populate("table");

    res.json(reservations);
};

exports.createGuest = async (req, res) => {
    const { name, email } = req.body;
    const reservationId = req.params.id;
    const reservation = await Reservation.findOne({ _id: reservationId }).populate("guests");
    if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" });
    }
    const guest = new Guest({ name, email });
    await guest.save();
    res.status(201).json(guest);
}

exports.getGuests = async (req, res) => {
    const reservation = await Reservation.findById(req.params.id).populate("guests");
    if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" });
    }
    res.json(reservation.guests);
}

exports.getGuest = async (req, res) => {
    const reservation = await Reservation.findById(req.params.reservationId).populate("guests");
    if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" });
    }
    const guest = reservation.guests.id(req.params.guestId);
    if (!guest) {
        return res.status(404).json({ message: "Guest not found" });
    }
    res.json(guest);
}

exports.updateGuest = async (req, res) => {
    const reservation = await Reservation.findById(req.params.reservationId).populate("guests");
    if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" });
    }
    const guest = reservation.guests.id(req.params.guestId);
    if (!guest) {
        return res.status(404).json({ message: "Guest not found" });
    }
    Object.assign(guest, req.body);
    await guest.save();
    res.json(guest);
}
exports.deleteGuest = async (req, res) => {
    const reservation = await Reservation.findById(req.params.reservationId).populate("guests");
    if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" });
    }
    const guest = reservation.guests.id(req.params.guestId);
    if (!guest) {
        return res.status(404).json({ message: "Guest not found" });
    }
    await guest.remove();
    res.json({ message: "Guest deleted successfully" });
}

exports.createInvoice = async (req, res) => {
    try {
        const { amount, status } = req.body;
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        const invoice = await Invoice.create({ reservation: reservation._id, amount, status });
        res.status(201).json(invoice);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findOne({ reservation: req.params.id });
        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        res.json(invoice);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findOneAndUpdate(
            { reservation: req.params.id },
            req.body , 
            { new: true }
        );
        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        res.json(invoice);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findOneAndDelete({ reservation: req.params.id });
        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        res.json({ message: "Invoice deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
