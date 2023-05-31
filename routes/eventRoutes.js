const express = require("express");
const router = express.Router();
const eventController = require("../controller/eventController");
const tokenValidation = require("../middleware/tokenValidation");
router.post("/", tokenValidation.validateToken, eventController.createEvent);

router.get("/:id", tokenValidation.validateToken, eventController.getEventById);

router.put("/:id", tokenValidation.validateToken, eventController.updateEvent);

router.get("/", tokenValidation.validateToken, eventController.getAllEvents);

router.delete(
  "/:id",
  tokenValidation.validateToken,
  eventController.deleteEvent
);

module.exports = router;
