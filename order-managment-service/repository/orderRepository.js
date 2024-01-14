// repository/orderRepository.js
const db = require('../dbConfig');
let orderRecords = [{
  "userId": "uuid1",
  "products": [
      {
          "productId": "2",
          "quantity": "2"
      }
  ],
  "orderId":"2"
}];
const getUserOrders = async (userId) => {
    // const [rows] = await db.query('SELECT * FROM orders WHERE userId = ', [userId]);
    let result = [];
    orderRecords.forEach(row=>{
      if(row.userId == userId){
        result.push(row);
      }
    })
    return {status:true,orders:result};
};

const createOrder = async (userId, products,orderId) => {
  try {
    // const [result] = await db.query('INSERT INTO orders (userId, products) VALUES (?, ?)', [userId, JSON.stringify(products)]);
    // const [newOrder] = await db.query('SELECT * FROM orders WHERE orderId = ?', [result.insertId]);
    for(let i = 0;i < orderRecords.length;i++){
      let row = orderRecords[i];
      if (row.orderId == orderId) {
          throw new Error("orderId already exist");
      }
    }
  
    orderRecords.push({userId,orderId,products});
    console.log(orderRecords);
    return {status:true,order:{userId,orderId,products}};
  } catch (error) {
    throw error;
  }
};

const updateOrder = async (orderId, userId, products) => {
    // const [existingOrder] = await db.query('SELECT * FROM orders WHERE orderId = ? AND userId = ?', [orderId, userId]);
    // if (existingOrder.length === 0) {
    //   throw new Error('Unauthorized: You do not have permission to update this order.');
    // }
    // await db.query('UPDATE orders SET products = ? WHERE orderId = ?', [JSON.stringify(products), orderId]);
    // const [updatedOrder] = await db.query('SELECT * FROM orders WHERE orderId = ?', [orderId]);

    for(let i = 0;i < orderRecords.length;i++){
      let row = orderRecords[i];
      console.log(row,orderId,userId);
      if (row.userId == userId && row.orderId == orderId) {
        row.products = products;
        return {status: true};
      }
      if (row.userId = userId && row.orderId == orderId) {
        throw new Error('Unauthorized: You do not have permission to update this order.');
      }
    }
    throw new Error('order doesnot exist in db');
}

const deleteOrder = async (orderId, userId) => {
    // const [deletedOrder] = await db.query('SELECT * FROM orders WHERE orderId = ? AND userId = ?', [orderId, userId]);

    // if (deletedOrder.length === 0) {
    //   throw new Error('Unauthorized: You do not have permission to delete this order.');
    // }

    // await db.query('DELETE FROM orders WHERE orderId = ?', [orderId]);

    let orderIndex = -1;

    for (let i = 0; i < orderRecords.length; i++) {
      console.log(orderRecords[i],orderId,userId);
      if ((orderRecords[i].userId === userId) && (orderRecords[i].orderId === orderId)) {
        orderIndex = i;
        break;
      }
    }

    if (orderIndex === -1) {
      throw new Error('Unauthorized: You do not have permission to delete this order.');
    }

    const deletedOrder = orderRecords.splice(orderIndex, 1)[0];

    return {
      status:true,
      message:"order deleted successfully" 
    };
};

module.exports = {
  getUserOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};
