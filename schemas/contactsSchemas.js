import Joi from "joi";

const phonePattern = new RegExp("^[0-9]{10}$");

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(phonePattern).required(),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().email(),
    phone: Joi.string().pattern(phonePattern),
});