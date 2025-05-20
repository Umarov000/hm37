const Joi = require("joi");

const topicValidation = (body)=>{
 const schema = Joi.object({
   author_id: Joi.string().optional(),
   title: Joi.string().trim().required(),
   text: Joi.string().trim().required(),
   created_date: Joi.string().trim().required(),
   updated_date: Joi.string().trim().required(),
   isChecked: Joi.boolean().default(false),
   isApproved: Joi.boolean().default(false),
   expert_id: Joi.string().optional(),
 })
 return schema.validate(body, { abortEarly: false });
 
}
   

module.exports = topicValidation;
