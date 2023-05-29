const express = require("express");
const router = express.Router();
const ticketController = require("../controller/ticketController");
const tokenValidation = require("../middleware/tokenValidation");
router.post("/", tokenValidation.validateToken, ticketController.createTicket);

router.get(
  "/:id",
  tokenValidation.validateToken,
  ticketController.getTicketById
);

router.put(
  "/:id",
  tokenValidation.validateToken,
  ticketController.updateTicket
);

router.get("/", tokenValidation.validateToken, ticketController.getAllTickets);

router.delete(
  "/:id",
  tokenValidation.validateToken,
  ticketController.deleteTicket
);
module.exports = router;
