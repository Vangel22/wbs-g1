const validateSchema = require("../helper/validateSchema");
const { remove } = require("../models/blog");
const { getSingle } = require("../models/blog");
const { create, getAll, update } = require("../models/blog");
const { BlogCreate, BlogUpdate } = require("../models/blog/validate");

const getAllPosts = async (req, res) => {
  try {
    const data = await getAll(req.auth.id);
    return res.status(200).send(data);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error!");
  }
};

const createPost = async (req, res) => {
  try {
    const data = {
      ...req.body,
      user_id: req.auth.id,
    };

    await validateSchema(data, BlogCreate);
    const newPost = await create(data);

    return res.status(200).send(newPost);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error!");
  }
};

const updatePost = async (req, res) => {
  try {
    const data = {
      ...req.body,
      user_id: req.auth.id,
    };

    await validateSchema(data, BlogUpdate);

    // proverka dali toj sto probuva da go azurira postot od
    // req.auth.id e ist so veke zapisaniot user_id na toj post

    const checkPost = await getSingle(req.params.id);

    if (!checkPost) {
      return res.status(400).send("Post not found!");
    }

    console.log("check user", checkPost.user_id);
    console.log("auth id", req.auth.id);

    if (checkPost.user_id.toString() !== req.auth.id.toString()) {
      return res.status(400).send("User is not owner of this post!");
    }

    // check user new ObjectId('66d21deb461f4011577e6095')
    // auth id 66d21deb461f4011577e6095

    const updatedPost = await update(req.params.id, data);

    return res.status(200).send(updatedPost);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error!");
  }
};

const removePost = async (req, res) => {
  try {
    const checkPost = await getSingle(req.params.id);

    if (!checkPost) {
      return res.status(400).send("Post not found!");
    }

    if (checkPost.user_id.toString() !== req.auth.id.toString()) {
      return res.status(400).send("User is not owner of this post!");
    }

    const removedPost = await remove(req.params.id);
    return res.status(200).send(removedPost);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error!");
  }
};

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  removePost,
};
