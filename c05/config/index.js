const fs = require("fs");

const CONFIG_SOURCE = `${__dirname}/../config.json`;

// azurirana pateka za razlika od chas 4

let config = null;

if (config === null) {
  const file = fs.readFileSync(CONFIG_SOURCE, "utf-8");
  config = JSON.parse(file);
  // JSON.stringify(config) -> obraten proces
}

// config.development
// config.development.port = drzi vrednost 3000
// config.staging
// config.live

// config
// config["nesto"] = null
// config."nesto" = error

const getSection = (section) => {
  if (!config[section])
    throw `Configuration section ${section} does not exist!`;
  return config[section];
};

module.exports = {
  getSection,
};
