// services/orderService.js
const orderRepository = require('../repository/orderRepository');

const getUserOrders = async (userId) => {
    const response = await orderRepository.getUserOrders(userId);
    if(response.status){
      return [201,{"status":"true",order:response.orders}]
    }
};

const createOrder = async (userId, products) => {
    const response = await orderRepository.createOrder(userId, products);
    if(response.status){
      return [201,{"status":"true","message":"order created successfully",order:response.order}]
    }
};

const updateOrder = async (orderId, userId, products) => {
    const response = await orderRepository.updateOrder(orderId, userId, products);
    if(response.status){
      return [200,{status:true,"message":"order updated successfully"}];
    }
};

const deleteOrder = async (orderId, userId) => {
    const response =  await orderRepository.deleteOrder(orderId, userId);
    return [200,response];
};

module.exports = {
  getUserOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};
