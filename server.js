const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const assetRoutes = require('./routes/assetRoutes');
const userRoutes = require('./routes/userRoutes');

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

mongoose.connect('mongodb://localhost:27017/asset_management', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

  
  app.use(express.json());
  app.use('/assets', assetRoutes);
  app.use('/users', userRoutes);
  