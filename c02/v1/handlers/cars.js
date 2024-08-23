const { readFile, writeFile } = require("../read-write");

const getCars = async (req, res) => {
  try {
    const cars = await readFile("data.json");
    return res.status(200).send(cars);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

const addCar = async (req, res) => {
  try {
    const cars = await readFile("data.json");
    const newCar = req.body;
    cars.push(newCar);
    await writeFile("data.json", cars);
    return res.status(200).send("New car added!");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

const updateCar = async (req, res) => {
  try {
    // vo req.params go imame identifikatorot za odreden avtomobil
    let cars = await readFile("data.json");
    const carId = Number(req.params.id); // 0
    const newData = req.body; // year 2019

    cars = cars.map((car, index) => {
      // 0 -> Mercedes
      if (index === carId) {
        return {
          ...car, // brand: Mercedes, model: CLS, year: 2020
          ...newData, // year: 2019
        };
      }
      return car;
    });
    await writeFile("data.json", cars);
    return res.status(200).send("Car updated successfully!");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

const removeCar = async (req, res) => {};

module.exports = {
  getCars,
  addCar,
  updateCar,
  removeCar,
};

// const objReq = {
//     params: {
//         id: 0
//     }
// }

// const { id } = objReq.params;
