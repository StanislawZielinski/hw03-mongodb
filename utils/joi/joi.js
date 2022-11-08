const Joi = require('joi');

const schema = Joi.object().keys({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
    email: Joi.string()
        .email({ tlds: false }),
    phone: Joi.number().integer(),
    favorite: Joi.boolean(),
    })

module.exports = {
    schema,
}