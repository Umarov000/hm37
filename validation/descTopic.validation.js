const Joi = require("joi");

const descTopicValidation = (body) => {
  const schema = Joi.object({
    desc_id: Joi.string().optional(),
    topic_id: Joi.string().optional(),
  });
  return schema.validate(body, { abortEarly: false });
};

module.exports = descTopicValidation;
