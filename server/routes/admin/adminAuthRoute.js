const express = require("express");
const router = express.Router();
const AdminAuthController = require("../../controllers/admin/adminAuthController");
const validator = require("../../validators/auth");

router.post(
  "/admin/signup",
  validator.validateSignUpRequest,
  validator.isRequestValidated,
  AdminAuthController.signup
);
router.post(
  "/admin/login",
  validator.validateSignInRequest,
  validator.isRequestValidated,
  AdminAuthController.login
);

router.post("/data", (req, res) => [
  res.status(200).json({
    message: req.body,
  }),
]);

module.exports = router;
