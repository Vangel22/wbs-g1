// ES5 - Callback
const greetMe = (name) => {
  console.log("Hi ", name);
};

const callbackFunction = (fn, name) => {
  // pravime nesto pred toa
  // se izgotvuva kartickata
  // name = "Semos"
  fn(name);
  //   fn(fn1(fn2(fn3())));
  // Callback hell
};

console.log(callbackFunction(greetMe, "Semos"));

// Povik na funkcija
// Referenca do funkcija
