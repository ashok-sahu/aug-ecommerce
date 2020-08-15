const express = require("express");
const router = express.Router();
const catagoryController = require("../controllers/catagoryController");
const commonMiddleware = require("../middlewares/authMiddlware");

router
  .get("/catagory/getAll", catagoryController.getAllCatagories)
  .post(
    "/catagory/create",
    commonMiddleware.requireSignin,
    commonMiddleware.adminMiddleware,
    catagoryController.addCatagory
  );

module.exports = router;
