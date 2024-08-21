// 3 vida na Scope
// 1. Global Scope
// 2. Functional/Local Scope
// 3. Block Scope

const zdravo = "Zdravo"; // globalen scope

function greetMe() {
  const hi = "Hi, Semos!";
  console.log(hi);
  console.log(zdravo);
  if (true) {
    const test = "test var";
    console.log(test);
  }
  // Ovde kodot dava greska
  console.log(test);
}

greetMe();
