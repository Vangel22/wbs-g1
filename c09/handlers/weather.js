const {
  getCityWeather,
  getFiveDaysForecastForCity,
} = require("../pkg/openweathermap");

const getForCity = async (req, res) => {
  try {
    const weather = await getCityWeather(req.params.city);
    return res.status(200).send(weather);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error!");
  }
};

const getFiveDayForecast = async (req, res) => {
  try {
    const { lon, lat } = req.params;
    const forecast = await getFiveDaysForecastForCity(lat, lon);
    return res.status(200).send(forecast);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error!");
  }
};

module.exports = {
  getForCity,
  getFiveDayForecast,
};
