const Joi = require('joi');

exports.checkDataValidation = (products) => {

    if (!products || !Array.isArray(products)) {
        return {
            error: 'Products are not avaible or it is not passed in an array'
        }
    }

    const productSchema = Joi.object({
        category: Joi.string().required(),
        name: Joi.string().required(),
        price: Joi.number().positive().required(),
        quantity: Joi.number().integer().min(1).required(),
        isImported: Joi.boolean().required().strict(true)
    });

    const validateProductSchema = Joi.array().items(productSchema).min(1);
    const { error } = validateProductSchema.validate(products);

    if (error) {
        return { error: 'Please check the input fields' }
    }
}

exports.roundTheAmount = (amount) => {
    const roundedAmount = Math.ceil(amount * 20) / 20;
    return roundedAmount;
}