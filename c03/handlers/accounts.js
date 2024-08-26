const bcryptjs = require("bcryptjs");

const { read, create, update, remove } = require("../models/accounts");
const {
  validateAccount,
  AccountCreate,
  AccountUpdate,
} = require("../models/validate");

const getAccounts = async (req, res) => {
  try {
    const accounts = await read();
    return res.status(200).send(accounts);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error!");
  }
};

const createAccount = async (req, res) => {
  try {
    const data = req.body;
    await validateAccount(req.body, AccountCreate);
    // { username, email, password }

    const regexPasswordValidator = /^[a-z]{3,10}/;

    // if(regexPasswordValidator.test(data.password)) {
    // }

    data.password = bcryptjs.hashSync(req.body.password);

    // oldPassword vs newPassword
    // newPassword, confirmPassword
    // newPassword !== oldPassword
    // getUserById(); -> t.e ke go zememe hashiraniot pass od databazata,
    // ke go sporedime so stariot pass. Toa ke ni kaze dali oldPassword i momentalniot pass se match,
    // ako ne se togas imame greska "Wrong Password"

    // prviot pass e toj sto sme go napisale vo formata
    // vtoriot e toj sto ni e enkriptiran i zapisan vo bazata
    // bcryptjs.compareSync("test123", data.password);
    // ova ni ovozmozuva da proverime dali passwordot e tocen
    // ova linija go enkriptira passwordot

    const newAccount = await create(data);
    return res.status(200).send(newAccount);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error!");
  }
};

const updateAccount = async (req, res) => {
  try {
    const accountId = req.params.id;
    await validateAccount(req.body, AccountUpdate);

    // const data = req.body;
    // oldPassword

    // bidejki rabotime so Mongo, nema potreba ova da e kastirano vo Number (ne rabotime so index od niza)
    // rabotime so ObjectId koj sto vo Javascript e String
    const updatedAccount = await update(accountId, req.body);
    return res.status(200).send(updatedAccount);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error!");
  }
};

const deleteAccount = async (req, res) => {
  try {
    const accountId = req.params.id;
    const deletedAccount = await remove(accountId);
    return res.status(200).send(deletedAccount);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error!");
  }
};

module.exports = {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
};
