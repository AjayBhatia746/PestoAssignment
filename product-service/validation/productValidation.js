const Joi = require('joi');

// Define the schema for product validation
const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(0).required(),
  id: Joi.string().required(),
  sellerId: Joi.string().required(),
  currency:Joi.string().required()
});

const updateProductSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(0).required(),
  sellerId: Joi.string().required(),
  currency:Joi.string().required(),
  version:Joi.number().min(0).required()
});

const getproductByIdSchema = Joi.object({
  id: Joi.string().required(),
});

module.exports = {
  productSchema,
  getproductByIdSchema,
  updateProductSchema
}


