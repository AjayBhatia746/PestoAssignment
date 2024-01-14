// controllers/orderController.js
const orderService = require('../services/orderService');
const orderSchema = require('../schema/orderSchema');

const validateOrder = (orderData) => {
  return orderSchema.validate(orderData, { abortEarly: false });
};

const getUserOrders = async (req, res) => {
  const userId = req.user.userId;
  try {
    const [status,response] = await orderService.getUserOrders(userId);
    res.status(status).send(response);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { products, orderId } = req.body;
    // Validate the incoming data against the order schema
    const validation = validateOrder({ products, orderId });

    if (validation.error) {
      throw new Error(validation.error);
    }

    const [status,response] = await orderService.createOrder(userId, products);
    res.status(status).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message,status:false });
  }
};

const updateOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { products,orderId } = req.body;
    // Validate the incoming data against the order schema
    const validation = validateOrder({ products,orderId });

    if (validation.error) {
      throw new Error(validation.error);
    }

    const [status,response] = await orderService.updateOrder(orderId, userId, products);
    res.status(status).send(response);
  } catch (error) {
    res.status(400).send({ message: error.message,status:false });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const orderId = req.params.orderId;
    const [status,response] = await orderService.deleteOrder(orderId, userId);
    res.status(status).send(response);
  } catch (error) {
    res.status(400).json({ message: error.message,status: false });
  }
};

module.exports = {
  getUserOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};
