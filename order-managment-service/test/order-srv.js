// test/orderService.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const orderService = require('../services/orderService');
const orderRepository = require('../repository/orderRepository');

chai.use(chaiHttp);
const expect = chai.expect;

// Mock orderRepository methods for testing
const mockOrderRepository = {
  getUserOrders: async (userId) => {
  },
  createOrder: async (userId, products) => {
  },
  updateOrder: async (orderId, userId, products) => {
  },
  deleteOrder: async (orderId, userId) => {
  },
};

// Replace orderRepository with mockOrderRepository for testing
orderService.__set__('orderRepository', mockOrderRepository);

describe('Order Service', () => {
  describe('getUserOrders', () => {
    it('should return user orders', async () => {
      // Mock the orderRepository.getUserOrders method
      mockOrderRepository.getUserOrders = async (userId) => {
        return { status: true, };
      };

      const response = await orderService.getUserOrders(uuid2);
      expect(response[0]).to.equal(201);
      expect(response[1].status).to.equal('true');
    });
  });

  describe('createOrder', () => {
    it('should create an order', async () => {
      // Mock the orderRepository.createOrder method
      mockOrderRepository.createOrder = async (userId, products) => {
        return { status: true, message: 'order created successfully' };
      };

      const response = await orderService.createOrder(uuid2, "2");
      expect(response[0]).to.equal(201);
      expect(response[1].status).to.equal('true');
      expect(response[1].message).to.equal('order created successfully');
    });
  });

  describe('updateOrder', () => {
    it('should update an order', async () => {
      // Mock the orderRepository.updateOrder method
      mockOrderRepository.updateOrder = async (orderId, userId, products) => {
        return { status: true, message: 'order updated successfully' };
      };

      const response = await orderService.updateOrder("2", uuid2, "2");
      expect(response[0]).to.equal(200);
      expect(response[1].status).to.equal(true);
      expect(response[1].message).to.equal('order updated successfully');
    });
  });

  describe('deleteOrder', () => {
    it('should delete an order', async () => {
      // Mock the orderRepository.deleteOrder method
      mockOrderRepository.deleteOrder = async (orderId, userId) => {
        return /* Mock delete response */;
      };

      const response = await orderService.deleteOrder("2", uuid2);
      expect(response[0]).to.equal(200);
      // Add more assertions based on the expected delete response
    });
  });
});
