const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  purchaseDate: Date,
  warrantyEndDate: Date
});

module.exports = mongoose.model('Asset', assetSchema);
