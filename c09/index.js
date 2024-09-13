const express = require("express");

const { getSection } = require("./pkg/config");
const { getForCity, getFiveDayForecast } = require("./handlers/weather");

const app = express();

app.get("/api/weather/:city", getForCity);
app.get("/api/forecast/:lat/:lon", getFiveDayForecast);

app.listen(getSection("weather").port, () =>
  console.log(`Server started at port ${getSection("weather").port}`)
);
