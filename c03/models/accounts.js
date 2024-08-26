const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const AccountsModel = mongoose.model("Account", accountSchema, "accounts");

// read
const read = async () => {
  return await AccountsModel.find();
};

// create
const create = async (data) => {
  const newAccount = new AccountsModel(data);
  return await newAccount.save();
};

// update
const update = async (_id, data) => {
  return await AccountsModel.updateOne({ _id }, data);
  // return await AccountsModel.updateOne({ _id }, { $set: { data } });
};

// delete
const remove = async (_id) => {
  return await AccountsModel.deleteOne({ _id });
};

module.exports = {
  read,
  create,
  update,
  remove,
};
