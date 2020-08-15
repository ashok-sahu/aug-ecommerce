const path = require('path')
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const commonMiddleware = require("../middlewares/authMiddlware");
const multer = require("multer");
const shortid = require('shortid')


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname),'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate()+'-'+file.originalname);
  },
});

const upload = multer({ storage});


router
  //   .get("/product/getAll", catagoryController.getAllCatagories)
  .post(
    "/product/create",
    commonMiddleware.requireSignin,
    commonMiddleware.adminMiddleware,
    upload.array("productPicture"),
    productController.addProduct
  );

module.exports = router;
