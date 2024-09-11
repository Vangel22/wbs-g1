const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Account",
  },
  title: String,
  numberOfArticle: {
    type: Number,
    min: 0,
    max: 10,
    default: 1,
    required: true,
  },
  content: String,
});

const PostsModel = mongoose.model("Post", postSchema, "posts");

const getAll = async (id) => {
  return await PostsModel.find({ user_id: id });
};

const getSingle = async (id) => {
  return await PostsModel.findOne({ _id: id });
};

const create = async (data) => {
  const post = new PostsModel(data);
  return await post.save();
};

const update = async (id, data) => {
  return await PostsModel.updateOne({ _id: id }, data);
};

const remove = async (id) => {
  return await PostsModel.deleteOne({ _id: id });
};

module.exports = {
  getAll,
  getSingle,
  create,
  update,
  remove,
};
