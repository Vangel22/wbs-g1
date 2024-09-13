const config = require("../config");

const CACHE = {};
// skopje: {
// timestamp: 123456789 -> vremeto koga sme go povikale api-to
// data: {}
// }

// CACHE {
//     skopje: {
//         timestamp:
//     },
//      strumica: {
//      },
// stip: {
// }
// }

// getCityWeather("Skopje") -> Fri 13 Sep 20:12
// getCityWeather("Skopje") -> Fri 13 Sep 20:13
// getCityWeather("Strumica") -> Fri 13 Sep 20:12
// getCityWeather("Stip") -> Fri 13 Sep 20:12
// getCityWeather("Strumica") -> Fri 13 Sep 20:13

const getCityWeather = async (city) => {
  let now = new Date().getTime() / 1000; // 1 Jan 1970 (Unix) - vo sekundi
  console.log("CACHE", CACHE);

  if (
    CACHE[city] && // dali prethodno go imame povikano api-to so grad Skopje
    now < CACHE[city].timestamp + config.getSection("weather").cache_expiery // ako ne pominale 60 sekundi
  ) {
    console.log("Data is from cache");
    return CACHE[city];
  }

  const URL = `${
    config.getSection("weather").API_URL
  }/weather?q=${city}&units=metric&appid=${
    config.getSection("weather").api_key
  }`;
  //   https://api.openweathermap.org/data/2.5/weather?q=Strumica&units=metric&appid=63ff22719581618dc79c14c2a85bf333

  try {
    const res = await fetch(URL);
    const data = await res.json();

    CACHE[city] = {
      timestamp: new Date().getTime() / 1000,
      data: data,
    };

    // vratete podatoci na prviot povik
  } catch (err) {
    throw err;
  }
};

const getFiveDaysForecastForCity = async (lat, lon) => {
  const URL = `${
    config.getSection("weather").API_URL
  }/forecast?lat=${lat}&lon=${lon}&appid=${
    config.getSection("weather").api_key
  }`;

  try {
    const res = await fetch(URL);
    const data = await res.json();

    return data;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getCityWeather,
  getFiveDaysForecastForCity,
};
