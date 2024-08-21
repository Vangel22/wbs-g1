const fs = require("fs");

const readFile = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", (err, data) => {
      //   if (err) return reject(err);
      //   return resolve(data);
      if (err) {
        return reject(err);
      } else {
        return resolve(data);
      }
    });
  });
};

const writeFile = (filename, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
};

(async () => {
  //   readFile("data.txt")
  //     .then((res) => console.log(res))
  //     .catch((err) => console.error(err));

  try {
    // const res = await readFile("dat.txt");
    const res = await readFile("data.txt");
    console.log(res);
  } catch (err) {
    console.error(err);
  } finally {
    console.log("Citanjeto zavrsi...");
  }
})();

// module.exports = {
//   readFile,
//   writeFile,
// };
