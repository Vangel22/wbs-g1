const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  //_id -> za postovite
  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Account",
  },
  title: String,
  content: String,
});

const PostsModel = mongoose.model("Post", postSchema, "posts");

// read

const getAll = async (id) => {
  return await PostsModel.find({ user_id: id });
};

const getSingle = async (id) => {
  return await PostsModel.findOne({ _id: id });
};

// create

const create = async (data) => {
  const post = new PostsModel(data);
  return await post.save();
};

// update

const update = async (id, data) => {
  return await PostsModel.updateOne({ _id: id }, data);
};

// remove

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
