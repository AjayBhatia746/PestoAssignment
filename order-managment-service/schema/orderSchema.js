const Joi = require('joi');

// Define the schema for order validation
const orderSchema = Joi.object({
  products: Joi.array().items(
    Joi.object({
      productId: Joi.number().required(),
      quantity: Joi.number().min(1).required(),
    })
  ).required(),
  orderId:Joi.string().required()
});

module.exports = orderSchema;