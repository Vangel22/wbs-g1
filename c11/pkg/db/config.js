const mongoose = require("mongoose");
const { getSection } = require("../config");

const uri = `mongodb+srv://${getSection("development").MONGO_USERNAME}:${
  getSection("development").MONGO_PASSWORD
}@cluster0.12jzasd.mongodb.net/grupa1?retryWrites=true&w=majority`;

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected!");
  } catch (err) {
    console.error(err);
  }
}

module.exports = connect;
