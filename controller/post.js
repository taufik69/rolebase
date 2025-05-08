const Post = require("../models/post.model");

exports.CreatePost = async (req, res) => {
  try {
    if (!req.body.title) {
      res.status(401).json({
        message: "title Missing",
      });
    }
    if (!req.body.description) {
      res.status(401).json({
        message: "description Missing",
      });
    }
    if (!req.body.category) {
      res.status(401).json({
        message: "category Missing",
      });
    }

    // save the post into database
    const { title, description, category } = req.body;

    // Create a new post
    const newPost = await Post.create({
      title,
      description,
      category,
    });

    if (newPost) {
      res.status(201).json({
        message: "Post Saved",
        data: newPost,
      });
    }
  } catch (error) {
    console.log("create post error", error);
    res.status(401).json({
      messeage: "create post Error",
      error: error,
    });
  }
};

exports.GetAllPost = async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },

      {
        $project: {
          title: 1,
          description: 1,
          category: "$category",
        },
      },
    ]);

    if (posts) {
      res.status(200).json({
        message: "All Posts",
        data: posts,
      });
    }
  } catch (error) {
    console.log("get all post error", error);
    res.status(401).json({
      messeage: "get all post Error",
      error: error,
    });
  }
};
