const Joi = require("joi");

const synonymValidation = (body) => {
  const schema = Joi.object({
    desc_id: Joi.string().optional(),
    dict_id: Joi.string().optional(),
  });
  return schema.validate(body, { abortEarly: false });
};

module.exports = synonymValidation;
