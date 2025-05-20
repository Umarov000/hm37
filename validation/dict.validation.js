const Joi = require("joi")

exports.dictValidation = (body)=>{
    const schema = Joi.object({
      term: Joi.string()
        .min(2)
        .message(`IT Termin 1 harfdan kam bo'lmasligi kerak.`)
        .required()
        .messages({
          "string.empty": `Lugat bo'sh bo'lishi mumkin emas`,
          "any.required": "Lugat albatta kiritilishi kerak",
        }),
      letter:Joi.string().trim()
    });
    return schema.validate(body, { abortEarly: false });
}