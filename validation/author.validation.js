const Joi = require("joi");

// const authorFullName = (parent) => {
//   return parent.first_name + " " + parent.last_name;
// };

exports.authorValidation = (body) => {
  const schema = Joi.object({
    first_name: Joi.string(),
    last_name: Joi.string(),
    nick_name: Joi.string()
      .min(3)
      .message("Nick 3 harfdan kam bo'lmasligi kerak")
      .max(15)
      .message("Nick 15 harfdan uzun bo'lmasligi kerak"),
    email: Joi.string().email().lowercase(),
    phone: Joi.string().pattern(/^\d{2}-\d{3}-\d{2}-\d{2}$/),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    confirm_password: Joi.ref("password"),
    info: Joi.string(),
    position: Joi.string(),
    photo: Joi.string().default("/author/avatar.png"),
    isExpert: Joi.boolean().default(false),
    isActive: Joi.boolean().default(false),
  });
  return schema.validate(body, { abortEarly: false });
};



// full_name: Joi.string().default(authorFullName),
// gender: Joi.string().valid("erkak", "ayol"),
//     birth_date: Joi.date().max("2000-11-11"),
//     referred: Joi.boolean(),
//     referredDetails: Joi.string().when("referred", {
//         is:true,
//         then: Joi.string().required(),
//         otherwise:Joi.string().optional()
//     }),
//     colors: Joi.array().items(Joi.string(), Joi.number()),
//     isYes: Joi.boolean().truthy("Yes", "Ha").valid(true)