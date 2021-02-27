// External Deps
const Joi = require("joi");

let LoginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).max(32).required()
});

let RegisterSchema = Joi.object({
	companyName: Joi.string().required().min(3).max(50),
	name: Joi.string().required().min(3).max(50),
	email: Joi.string().email().required(),
	phone: Joi.string().length(10).required(),
	password: Joi.string().min(8).max(32).required()
});

module.exports = {
	LoginSchema,
	RegisterSchema
};