const Joi = require("joi");

// schema define

const userSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string()
    .email({
        minDomainSegments: 1,
        tlds: { allow: ["com"]},
    })
    .required(),
    gender: Joi.string().valid("f", "m", "o" ),
});

// mw define
const validator = async ( req, res, next ) => {
    try{
    await userSchema.validateAsync(req.body);
    next();
    } catch (e) {
        next(e);
    }
};

module.exports = { validator };
