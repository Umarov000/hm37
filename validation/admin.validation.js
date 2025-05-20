const Joi = require("joi");

exports.adminValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().lowercase(),
    phone: Joi.string().pattern(/^\d{2}-\d{3}-\d{2}-\d{2}$/),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    created_date: Joi.string().trim().required(),
    updated_date: Joi.string().trim().required(),
    isActive: Joi.boolean().default(false),
    isCreator: Joi.boolean().default(false),
  });
  return schema.validate(body, { abortEarly: false });
};
