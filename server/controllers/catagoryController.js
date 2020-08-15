const slugify = require("slugify");
const Catagory = require("../models/catagoriesModel");

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate._name,
      slug: cate.slug,
      children: createCategories(categories, cate._id),
    });
  }
  return categoryList;
}

exports.addCatagory = (req, res) => {
  const catagoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };
  if (req.body.parentId) {
    catagoryObj.parentId = req.body.parentId;
  }

  const cat = new Catagory(catagoryObj);
  cat.save((error, category) => {
    if (error) return res.status(400).json({ message: error });
    if (category) {
      res.status(201).json({ message: category });
    }
  });
};

exports.getAllCatagories = async (req, res) => {
  const data = await Catagory.find().exec((error, categories) => {
    if (error)
      res.status(404).json({
        status: "failed",
        message: error,
      });

    if (categories) {
      const categoryList = createCategories(categories);
      res
        .status(200)
        .json({
          status: "success",
          requestedAt: req.requestTime,
          results: categoryList.length,
          data: categoryList,
        });
    }
  });
};
