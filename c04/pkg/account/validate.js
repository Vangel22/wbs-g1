const { Validator } = require("node-input-validator");

const AccoutLogin = {
  email: "required|string",
  password: "required|string",
};

const AccoutRegister = {
  username: "required|string",
  email: "required|string",
  password: "required|string",
  confirmPassword: "required|string",
};

const AccountCreate = {
  username: "required|string",
  email: "required|email",
  password: "required|string",
};

const AccountUpdate = {
  username: "string",
  email: "email",
  password: "string",
};

const validateAccount = async (data, schema) => {
  const validator = new Validator(data, schema); // data e isto req.body
  const err = await validator.check();
  // ako err e false togas imame greska, vo sprotivno imame uspeh

  if (!err) {
    // ako validator.check() ni vrati true znaci imalo greska
    throw {
      code: 400,
      error: "Nasa greska",
    };
  }
};

module.exports = {
  AccoutLogin,
  AccoutRegister,
  AccountCreate,
  AccountUpdate,
  validateAccount,
};
