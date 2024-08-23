const express = require("express");

const { getCars, addCar, updateCar } = require("./handlers/cars");

const app = express();
app.use(express.json());
// ova ni treba za da mozeme da ispratime req.body vo json format

app.get("/cars", getCars);
// app.get("/cars", () => { console.log("Nema da ja fati ovaa funkcija") });
app.post("/cars", addCar);
app.put("/cars/:id", updateCar);

app.listen(3000, () => console.log("Server started at port 3000!"));
