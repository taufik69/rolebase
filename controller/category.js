const Category = require("../models/category.model");
exports.CreateCategory = async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(401).json({
        message: "name Missing",
      });
    }

    //check this item already exist or not
    const isExist = await Category.aggregate([
      {
        $match: {
          name: {
            $regex: req.body.name,
            $options: "i",
          },
        },
      },
    ]);
    // check if the category already exist
    if (isExist.length > 0) {
      res.status(401).json({
        message: "Category already exist",
      });
    }

    // save the category into database
    const saveCategory = await Category.create({ ...req.body });

    if (saveCategory) {
      res.status(201).json({
        message: "Category Saved",
        data: saveCategory,
      });
    }
  } catch (error) {
    console.log("create category error");
    res.status(401).json({
      messeage: "create category Error",
      error: error,
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.aggregate([
      {
        $project: {
          name: 1,
          _id: 1,
        },
      },
      {
        $sort: {
          name: -1,
        },
      },
    ]);
    if (category) {
      res.status(200).json({
        message: "Category Fetched",
        data: category,
      });
    }
  } catch (error) {
    console.log("get category error");
    res.status(401).json({
      messeage: "get category Error",
      error: error,
    });
  }
};
