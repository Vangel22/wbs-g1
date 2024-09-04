const fs = require("fs");

const CONFIG_SOURCE = `${__dirname}/../../config.json`;

let config = null;

if (config === null) {
  const file = fs.readFileSync(CONFIG_SOURCE, "utf-8");
  config = JSON.parse(file); // go imame vo objekt

  // vaka izgleda posle linija 9
  // config = {
  //   development: {
  //     port: 3000,
  //     MONGO_USERNAME: "Vangel22",
  //     MONGO_PASSWORD: "test1234",
  //     jwt_secret: "this is my secret",
  //   },
  //   staging: {
  //     port: 3000,
  //     MONGO_USERNAME: "test",
  //     MONGO_PASSWORD: "test",
  //   },
  //   live: {
  //     port: 8080,
  //     MONGO_USERNAME: "admin",
  //     MONGO_PASSWORD: "admin",
  //   },
  // };
}

// config["development"] // togas daj mi podatoci

// const human = {
//   name: "",
//   surname: ""
// }

// human["name"]; // ni ovozmozuva dinamicno da pristapime do kluc od objektot
// human.name;

const getSection = (section) => {
  if (!config[section])
    // ako sekcijata ne postoi config[section] e null, negacija na null e true
    throw `Configuration section ${section} does not exist!`;
  return config[section];
};

module.exports = {
  getSection,
};
