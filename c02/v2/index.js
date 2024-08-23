const express = require("express");

const connect = require("./db/config");
connect();
const { getCars, addCar, updateCar, removeCar } = require("./handlers/cars");

const app = express();
app.use(express.json());
// ova ni treba za da mozeme da ispratime req.body vo json format

app.get("/cars", getCars);
app.post("/cars", addCar);
app.put("/cars/:id", updateCar);
app.delete("/cars/:id", removeCar);

app.listen(3000, () => console.log("Server started at port 3000!"));
