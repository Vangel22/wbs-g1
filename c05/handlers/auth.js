const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { getByEmail, create } = require("../models/account");
const { AccoutLogin, AccoutRegister } = require("../models/account/validate");
const validate = require("../helper/validateSchema");
const { getSection } = require("../config/index");

const login = async (req, res) => {
  try {
    await validate(req.body, AccoutLogin);
    const { email, password } = req.body;

    const account = await getByEmail(email);
    password, account._id;

    if (!account) {
      return res.status(400).send("Account not found!");
    }

    if (!bcrypt.compareSync(password, account.password)) {
      return res.status(400).send("Wrong password!");
    }

    const payload = {
      id: account._id,
      username: account.username,
      email: account.email,
      exp: new Date() / 1000 + 7 * 24 * 60 * 60,
    };

    const token = jwt.sign(payload, getSection("development").jwt_secret);

    return res.status(200).send({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error!");
  }
};

const register = async (req, res) => {
  try {
    await validate(req.body, AccoutRegister);
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
