const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const {authenticateToken} = require("./services/authenticationService");

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(authenticateToken);
app.use('/product', productRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Product Service is running on ${PORT}`);
});
