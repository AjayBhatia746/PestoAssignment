const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/', orderController.getUserOrders);
router.post('/', orderController.createOrder);
router.put('/', orderController.updateOrder);
router.delete('/:orderId', orderController.deleteOrder);

module.exports = router;