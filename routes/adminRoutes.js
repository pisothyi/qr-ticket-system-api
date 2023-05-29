const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const adminSchema = require("../apiSchema/adminSchema");

router.post(
  "/signup",
  joiSchemaValidation.validateBody(adminSchema.signup),
  adminController.signup
);

router.post(
  "/login",
  joiSchemaValidation.validateBody(adminSchema.login),
  adminController.login
);

module.exports = router;
