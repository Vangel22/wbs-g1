// Arrow function
const sum = (a, b) => a + b;
const sumTwo = (a, b) => {
  return a + b;
};

// console.log(sum(2, 3));
// console.log(sumTwo(3, 3));

// Function
function sumAB(a, b) {
  //   console.log(a + b);
  return a + b;
}

const result = sumAB(5, 5);
// console.log("result", result);

// Functional Expression
const sumiraj = function (a, b) {
  return a + b;
  // this
};

// console.log(sumiraj(10, 20));

// IIFE
// nekojaFunkcija()
(() => {
  const sumAB = sumiraj(15, 12);
  console.log(sumAB);
})();

// (function() {})()
