// index.js
const express = require('express');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes');
const {authenticateToken} = require("./services/authenticationService");
const app = express();
const PORT = 3002; // Assuming your authentication service runs on port 3002

// Middleware
app.use(bodyParser.json());
app.use(authenticateToken);
// Routes
app.use('/order', orderRoutes);

// 404 route not found handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Order Service is running on: ${PORT}`);
});
