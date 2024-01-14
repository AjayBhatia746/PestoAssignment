const express = require('express');
const router = express.Router();
const Joi = require('joi');

// Joi schema for request body validation
const userRegisterSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  userId:Joi.string().required()
});

const userLoginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

// Middleware for request body validation
module.exports.validateUserRegister = async function(req, res, next) {
  const { error } = userRegisterSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ status:false, error: error.details[0].message });
  }
  next();
}

module.exports.validateUserLogin = async function(req, res, next) {
  const { error } = userLoginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ status:false, error: error.details[0].message });
  }
  next();
}


