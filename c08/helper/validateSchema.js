const { Validator } = require("node-input-validator");

const validateSchema = async (data, schema) => {
  const validator = new Validator(data, schema);
  const err = await validator.check();

  if (!err) {
    throw {
      code: 400,
      error: await validator.errors,
    };
  }
};

module.exports = validateSchema;
