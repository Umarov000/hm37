const Joi = require("joi");

const descQAValidation = (body) => {
  const schema = Joi.object({
    qa_id: Joi.string().optional(),
    desc_id: Joi.string().optional(),
  });
  return schema.validate(body, { abortEarly: false });
};

module.exports = descQAValidation;
