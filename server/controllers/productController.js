const Product = require("../models/productsModel");
const shortId = require("shortid");
const slugify = require("slugify");

exports.addProduct = (req, res) => {
  // res.status(200).json({file:req.file,body:req.body})//for single file
  // res.status(200).json({file:req.files,body:req.body})//for multiple files

  const {
    name,
    price,
    description,
    category,
    quantity,
    createdBy,
  } = req.body;

  let productPictures = [];
  if (req.files.length > 0) {
    //   console.log(req,files.length,'length')
    productPictures = req.files.map((file) => {
      return {img:file.filename};
    });
  }

  const product = new Product({
    name,
    slug: slugify(name),
    price,
    description,
    productPictures,
    category,
    quantity,
    createdBy: req.user._id,
  });

  product.save(((error, product) => {
    if (error)
      return res.status(404).json({
        status: "failed",
        message: error,
      });
    if (product) {
      res.status(201).json({ data: product });
    }
  }))
};
