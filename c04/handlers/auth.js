const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { getByEmail, create } = require("../pkg/account");
const {
  validateAccount,
  AccoutLogin,
  AccoutRegister,
} = require("../pkg/account/validate");
const { getSection } = require("../pkg/config");

const login = async (req, res) => {
  try {
    await validateAccount(req.body, AccoutLogin);
    const { email, password } = req.body;

    const account = await getByEmail(email); // undefined, null, false
    // ovde imame podatoci od databazata za username, password, email, _id
    // account.email, account.username, account.password, account._id

    // true
    if (!account) {
      return res.status(400).send("Account not found!");
    }

    if (!bcrypt.compareSync(password, account.password)) {
      return res.status(400).send("Wrong password!");
    }

    const payload = {
      username: account.username,
      email: account.email,
      id: account._id,
      exp: new Date() / 1000 + 7 * 24 * 60 * 60,
    };

    // new Date() -> vremeto od 1 januari 1970 vo milisekundi
    // new Date() / 1000 -> vremeto od 1 januari 1970 vo sekundi
    // new Date() / 1000 + 7 * 24 * 60 * 60 -> vremeto od povikuvanje na login fukcijata + 7 denovi vo idnina

    const token = jwt.sign(payload, getSection("development").jwt_secret);
    //getSection("development").jwt_secret -> e klucot koj se spodeluva na nivo na aplikacija za sekoj koj se logira

    // const test = jwt.verify(token, getSection("development").jwt_secret) -> potvrduvame dali tokenot e validen

    return res.status(200).send({ token });
  } catch (err) {
    console.err(err);
    return res.status(500).send("Internal Server Error!");
  }
};

const register = async (req, res) => {
  try {
    await validateAccount(req.body, AccoutRegister);
    const { username, email, password, confirmPassword } = req.body;

    const exist = await getByEmail(email);
    if (exist) {
      return res.status(400).send("Account with this email already exists!");
    }

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match!");
    }

    const data = {
      username,
      email,
      password: bcrypt.hashSync(password),
    };

    const account = await create(data);
    return res.status(200).send(account);
  } catch (err) {
    console.err(err);
    return res.status(500).send("Internal Server Error!");
  }
};

module.exports = {
  login,
  register,
};
