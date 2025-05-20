const Joi = require("joi");

const tagValidation = (body) => {
  const schema = Joi.object({
    category_id: Joi.string().optional(),
    topic_id: Joi.string().optional(),
  });
  return schema.validate(body, { abortEarly: false });
};

module.exports = tagValidation;
