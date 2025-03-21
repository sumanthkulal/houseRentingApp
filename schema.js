// const { title } = require("process")

const Joi=require("joi")

module.exports.listingSchema=Joi.object(
    {
        listing:Joi.object({ 
            title:Joi.string().required(),
            description:Joi.string().required(),
            location:Joi.string().required(),
            country:Joi.string().required(),
            price:Joi.string().required().min(0),
            image:Joi.required()
        }).required() 
    }
)