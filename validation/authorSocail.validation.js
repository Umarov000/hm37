const Joi = require("joi");

const authorSocailValidation = (body) => {
  const schema = Joi.object({
    author_id: Joi.string().optional(),
    social_id: Joi.string().optional(),
    social_link: Joi.string().trim()
  });
  return schema.validate(body, { abortEarly: false });
};

module.exports = authorSocailValidation;
