const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/auth', authRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Api Gateway is running on :${PORT}`);
});
