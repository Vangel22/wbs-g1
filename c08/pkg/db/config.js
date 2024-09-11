const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.12jzasd.mongodb.net/grupa1?retryWrites=true&w=majority`;

// const uri = `mongodb+srv://${getSection(process.env.SECTION).port}:${
//   process.env.MONGO_PASSWORD
// }@cluster0.12jzasd.mongodb.net/grupa1?retryWrites=true&w=majority`;

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected!");
  } catch (err) {
    console.error(err);
  }
}

module.exports = connect;
