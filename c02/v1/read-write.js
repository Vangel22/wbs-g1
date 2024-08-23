const fs = require("fs");

const readFile = async (fileName) => {
  return new Promise((success, fail) => {
    fs.readFile(fileName, "utf8", (err, data) => {
      if (err) return fail(err);
      data = JSON.parse(data);
      return success(data);
    });
  });
};

const writeFile = async (fileName, data) => {
  return new Promise((success, fail) => {
    data = JSON.stringify(data);
    fs.writeFile(fileName, data, (err) => {
      if (err) return fail(err);
      return success();
    });
  });
};

module.exports = {
  readFile,
  writeFile,
};
