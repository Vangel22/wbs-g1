const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { getByEmail, create, setNewPassword } = require("../models/account");
const {
  validateAccount,
  AccoutLogin,
  AccoutRegister,
} = require("../models/account/validate");
const { getSection } = require("../models/config");

const login = async (req, res) => {
  try {
    await validateAccount(req.body, AccoutLogin);
    // Body Postman
    const { email, password } = req.body;

    const account = await getByEmail(email);

    if (!account) {
      return res.status(400).send("Account not found!");
    }

    // test@test.com
    // test

    if (!bcrypt.compareSync(password, account.password)) {
      return res.status(400).send("Wrong password!");
    }

    // Authorization Postman
    const payload = {
      username: account.username,
      email: account.email,
      id: account._id,
      exp: new Date() / 1000 + 7 * 24 * 60 * 60,
    };

    // new Date() -> vremeto od 1 januari 1970 vo milisekundi
    // new Date() / 1000 -> vremeto od 1 januari 1970 vo sekundi
    // new Date() / 1000 + 7 * 24 * 60 * 60 -> vremeto od povikuvanje na login fukcijata + 7 denovi vo idnina

    // process.env.ENVIRONMENT
    const token = jwt.sign(payload, getSection("development").jwt_secret);

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

const refreshToken = async (req, res) => {
  const payload = {
    ...req.auth, // ova e nasiot vekje najaven korisnik
    exp: new Date() / 1000 + 7 * 24 * 60 * 60, // ke go prodolzi tokenot za 7 dena
  };

  const token = jwt.sign(payload, getSection("development".jwt_secret));

  return res.status(200).send({ token });
};

const resetPassword = async (req, res) => {
  // old password, new pass, confirm pass
  const { email, newPassword, confirmPassword } = req.body;

  try {
    const account = await getByEmail(email);

    if (!account) {
      return res.status(400).send("Account not found!");
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).send("Passwords do not match!");
    }

    if (bcrypt.compareSync(newPassword, account.password)) {
      return res.status(400).send("New password cannot be old password!");
    }

    const newHashedPassword = bcrypt.hashSync(newPassword);

    const userPasswordChanged = await setNewPassword(
      account._id.toString(),
      newHashedPassword
    );

    return res.status(200).send(userPasswordChanged);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error!");
  }
};

// const forgotPassword =  async (req, res) => {
// }

// index, server, app.js -> rutite
// controller/handler
// models, pkg

module.exports = {
  login,
  register,
  refreshToken,
  resetPassword,
};
