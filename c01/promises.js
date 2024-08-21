// Statusi - resolved, rejected, pending

const fetchDataPromise = () => {
  return new Promise((resolve, reject) => {
    console.log("Fetching data...");
    setTimeout(() => {
      const data = { id: 1, title: "Learn JS", completed: false };
      resolve(data);
    }, 3000);
  });
};

fetchDataPromise()
  .then((data) => console.log(data))
  .catch((error) => console.log(error))
  .finally("Done fetching data!");
