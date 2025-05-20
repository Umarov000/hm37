const Joi = require("joi");

exports.questionAnswerValidation = (body) => {
  const schema = Joi.object({
    question: Joi.string().trim(),
    answer: Joi.string().trim(),
    created_date: Joi.string().trim().required(),
    updated_date: Joi.string().trim().required(),
    isChecked: Joi.boolean().default(false),
    user_id: Joi.string().optional(),
    expert_id: Joi.string().optional(),
  });
  return schema.validate(body, { abortEarly: false });
};
