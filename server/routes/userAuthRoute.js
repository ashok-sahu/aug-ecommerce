const express = require("express");
const router = express.Router();
const userAuthController = require("../controllers/userAuthController");
const validator = require("../validators/auth");

router.post(
  "/signup",
  validator.validateSignUpRequest,
  validator.isRequestValidated,
  userAuthController.signup
);
router
.get('/usersList',userAuthController.UsersList)
.post(
  "/login",
  validator.validateSignInRequest,
  validator.isRequestValidated,
  userAuthController.login
)

// router.post("/profile", userAuthController.requireSignin, (req, res) => {
//   res.status(200).json({
//     message: "profile created",
//   });
// });

router.post("/data", (req, res) => [
  res.status(200).json({
    message: req.body,
  }),
]);



module.exports = router;
