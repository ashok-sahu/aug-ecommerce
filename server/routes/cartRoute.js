const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const commonMiddleware = require("../middlewares/authMiddlware");

router
//   .get("/catagory/getAll", catagoryController.getAllCatagories)
  .post(
    "/user/cart/addToCart",
    commonMiddleware.requireSignin,
    commonMiddleware.userMiddleware,
    cartController.addItemToCart
  );

module.exports = router;
