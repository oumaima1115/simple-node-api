const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservation.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.post("/", authMiddleware, reservationController.createReservation);
router.get("/", reservationController.getReservations);

//Guest routes
router.post("/:id/guests", reservationController.createGuest);
router.get("/:id/guests", reservationController.getGuests);
router.get("/:reservationId/guests/:guestId", reservationController.getGuest);
router.put("/:reservationId/guests/:guestId", reservationController.updateGuest);
router.delete("/:reservationId/guests/:guestId", reservationController.deleteGuest);

//invoice routes
router.post("/:id/invoice", reservationController.createInvoice);
router.get("/:id/invoice", reservationController.getInvoice);
router.put("/:id/invoice", reservationController.updateInvoice);
router.delete("/:id/invoice", reservationController.deleteInvoice);

module.exports = router;