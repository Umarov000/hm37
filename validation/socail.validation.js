const Joi = require("joi");

const socailValidation = (body)=>{
 const schema = Joi.object({
   name: Joi.string().trim().required(),
   icon_file:Joi.string().trim().required()
 })
 return schema.validate(body, { abortEarly: false });
 
}
   

module.exports = socailValidation;
