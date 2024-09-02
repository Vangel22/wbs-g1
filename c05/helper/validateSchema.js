const { Validator } = require("node-input-validator");

const validateSchema = async (data, schema) => {
  const validator = new Validator(data, schema); // data e isto req.body
  const err = await validator.check();
  // ako err e false togas imame greska, vo sprotivno imame uspeh

  if (!err) {
    // ako validator.check() ni vrati true znaci imalo greska
    throw {
      code: 400,
      error: await validator.errors,
      // validator.errors.content.message
    };
  }
};

module.exports = validateSchema;
