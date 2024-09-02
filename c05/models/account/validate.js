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

module.exports = {
  AccoutLogin,
  AccoutRegister,
  AccountCreate,
  AccountUpdate,
};
