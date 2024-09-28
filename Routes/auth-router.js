const express = require("express");
const router = express.Router();
const { register, login } = require("../Controllers/auth-controller");
const validate = require("../Middlewares/validate-middlewares");
const authValidator = require("../Validators/auth-validator");

router.post("/register", validate(authValidator.RegisterSchema), register);
router.post("/login", validate(authValidator.LoginSchema), login);

module.exports = router;
