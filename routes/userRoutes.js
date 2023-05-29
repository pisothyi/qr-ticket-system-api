const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const tokenValidation = require("../middleware/tokenValidation");
router.post("/", tokenValidation.validateToken, userController.createUser);

router.get("/:id", tokenValidation.validateToken, userController.getUserById);

router.put("/:id", tokenValidation.validateToken, userController.updateUser);

router.get("/", tokenValidation.validateToken, userController.getAllUsers);

router.delete("/:id", tokenValidation.validateToken, userController.deleteUser);
module.exports = router;
