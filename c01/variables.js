// var, const, let => ES6

// var test = "this is test var";

// Block scope
// const - ne se promenuva
// let - se promenuva

// Primitive data types
// string, boolean, number

// Non primitive data types
// array, object, function

// mozeme da go reinicijalizirame
let moetoIme = "Vangel";
moetoIme = "Semos";

// ne mozeme istoto kaj konstanta
const jasSum = "Trpe";
// jasSum = "Trpana";

const obj = {
  ime: "Test",
  prezime: "Admin",
};

// Ova ke pojavi greska dokolku obj e const, treba da bide let za da funkcionira
// obj = {
//   test: "Hello",
// };

// obj.ime = "Semos";

console.log("object", obj);
