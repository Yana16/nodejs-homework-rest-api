const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required().message({
    "nay.required": `"name" is required`,
  }),
  email: Joi.string().required().message({
    "string.empty": `"email" can not be empty`,
  }),
  phone: Joi.string().required().message({
    "string.base": `"phone" must be string`,
  }),
});

module.exports = {
  addSchema,
};
