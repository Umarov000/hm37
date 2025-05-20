const Joi = require("joi");

const descValidation = (body) => {
  const schema = Joi.object({
    category_id: Joi.string().optional(),
    desc: Joi.string().trim().required(),
  });
  return schema.validate(body, { abortEarly: false });
};

module.exports = descValidation;
