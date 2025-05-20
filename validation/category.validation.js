const Joi = require("joi");

const categoryValidation = (body)=>{
 const schema = Joi.object({
   name: Joi.string().trim().required(),
   parent_category_id: Joi.string().optional(),
 });
 return schema.validate(body, { abortEarly: false });
 
}
   

module.exports = categoryValidation;
