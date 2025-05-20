const Joi = require("joi");

exports.userValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().lowercase(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    info: Joi.string(),
    photo: Joi.string().default("/author/avatar.png"),
    created_date: Joi.string().trim().required(),
    updated_date: Joi.string().trim().required(),
    isActive: Joi.boolean().default(false),
  });
  return schema.validate(body, { abortEarly: false });
};


