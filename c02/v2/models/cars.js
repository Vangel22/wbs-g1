const mongoose = require("mongoose");

const carSchema = mongoose.Schema({
  brand: String,
  model: String,
  year: Number,
});

const CarModel = mongoose.model("Car", carSchema, "cars");

// get all cars
const readCars = async () => {
  return await CarModel.find();
};

// create
const add = async (data) => {
  const newCar = new CarModel(data);
  return await newCar.save();
};

const update = async (id, data) => {
  return await CarModel.updateOne({ _id: id }, data);
};

const remove = async (id) => {
  return await CarModel.deleteOne({ _id: id });
};

module.exports = {
  readCars,
  add,
  update,
  remove,
};
