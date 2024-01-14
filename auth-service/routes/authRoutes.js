const express = require('express');
const router = express.Router();

const authController = require("../controllers/authController")
const userValidation = require("../validation/userValidation")

router.post('/register',userValidation.validateUserRegister ,authController.register);
router.post('/login', userValidation.validateUserLogin ,authController.login);

module.exports = router;