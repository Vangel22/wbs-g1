const { readCars, add, update, remove } = require("../models/cars");

const getCars = async (req, res) => {
  try {
    const cars = await readCars();
    return res.status(200).send(cars);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

const addCar = async (req, res) => {
  try {
    await add(req.body);
    return res.status(200).send("New car added!");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

const updateCar = async (req, res) => {
  try {
    await update(req.params.id, req.body);
    return res.status(200).send("Car updated successfully!");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

const removeCar = async (req, res) => {
  try {
    await remove(req.params.id);
    return res.status(200).send("Car deleted successfully!");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getCars,
  addCar,
  updateCar,
  removeCar,
};
