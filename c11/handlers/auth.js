const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const {
  getByEmail,
  create,
  setNewPassword,
  getById,
} = require("../pkg/account");
const {
  validateAccount,
  AccoutLogin,
  AccoutRegister,
} = require("../pkg/account/validate");
const { getSection } = require("../pkg/config");
const { sendMail } = require("../pkg/mailer");

const login = async (req, res) => {
  try {
    await validateAccount(req.body, AccoutLogin);
    const { email, password } = req.body;

    const account = await getByEmail(email);

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
    ...req.auth,
    exp: new Date() / 1000 + 7 * 24 * 60 * 60,
  };

  const token = jwt.sign(payload, getSection("development".jwt_secret));

  return res.status(200).send({ token });
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await getByEmail(email);

    if (!user) {
      return res.status(400).send("User not registered!");
    }

    const secret = getSection("development").jwt_secret + user.password;
    const payload = {
      email: user.email, // moze da bide i od req.body.email
      id: user._id,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "15m" });

    const link = `http://localhost:10000/reset-password/${user._id}/${token}`;
    console.log("link", link); // vie mozete da odite preku Mailgun

    const data = {
      user,
      link,
    };

    await sendMail(user.email, "PASSWORD_TEMPLATE", data);
    return res
      .status(200)
      .send("Password reset link has been sent to your email...");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error!");
  }
};

const resetPasswordTemplate = async (req, res) => {
  try {
    const { id, token } = req.params;

    const user = await getById(id);

    if (!user) {
      return res.status(400).send("User not found!");
    }

    const secret = getSection("development").jwt_secret + user.password;

    const payload = jwt.verify(token, secret);
    if (!payload) {
      return res.status(400).send("Token not valid!");
    }

    res.render("reset-password", { email: user.email });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error!");
  }
};

// const resetPassword = async (req, res) => {
//   const { email, newPassword, confirmPassword } = req.body;

//   try {
//     const account = await getByEmail(email);

//     if (!account) {
//       return res.status(400).send("Account not found!");
//     }

//     if (newPassword !== confirmPassword) {
//       return res.status(400).send("Passwords do not match!");
//     }

//     if (bcrypt.compareSync(newPassword, account.password)) {
//       return res.status(400).send("New password cannot be old password!");
//     }

//     const newHashedPassword = bcrypt.hashSync(newPassword);

//     const userPasswordChanged = await setNewPassword(
//       account._id.toString(),
//       newHashedPassword
//     );

//     return res.status(200).send(userPasswordChanged);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).send("Internal Server Error!");
//   }
// };

module.exports = {
  login,
  register,
  refreshToken,
  // resetPassword,
  resetPasswordTemplate,
  forgotPassword,
};
