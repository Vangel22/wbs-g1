const makeId = (length) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // 62 karakteri
  const charLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charLength)); // 1.5 -> 2
    // 1.05 -> 2 -> Math.ceil
    // 1.05 -> 1 -> Math.floor

    //Math.random -> ni dava broj pomegju 0 i 1
    // Math.random() * charLength
    // 0.2 * 62 = 12.4 -> 12 -> bukvata M
    // 1 * 62 = 62 -> brojka 9
  }

  return result;
};

module.exports = makeId;

// one.jpg => one_tr23p4
// makeId(6) => tr23p4
// makeId(6) => da mi generira 6 random brojki,bukvi
