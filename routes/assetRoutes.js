const express = require('express');
const router = express.Router();
const Asset = require('../models/asset');
const authenticateToken = require('../middleware/auth');

// Get all assets
router.get('/', async (req, res) => {
  try {
    const assets = await Asset.find();
    res.json(assets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single asset
router.get('/:id', getAsset, (req, res) => {
  res.json(res.asset);
});

// Create a new asset
router.post('/', async (req, res) => {
  const asset = new Asset({
    name: req.body.name,
    description: req.body.description,
    assignedTo: req.body.assignedTo,
    purchaseDate: req.body.purchaseDate,
    warrantyEndDate: req.body.warrantyEndDate
  });
  try {
    const newAsset = await asset.save();
    res.status(201).json(newAsset);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware to get asset by ID
async function getAsset(req, res, next) {
  let asset;
  try {
    asset = await Asset.findById(req.params.id);
    if (asset == null) {
      return res.status(404).json({ message: 'Cannot find asset' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.asset = asset;
  next();
}



router.post('/', authenticateToken, async (req, res) => {
  // Only authenticated users can create assets
});

module.exports = router;
