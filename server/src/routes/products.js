const express = require('express');
const router = express.Router();
const products = require('../data/products');

router.get('/', (req, res) => {
  const summary = products.map(({ id, name, type, description, tags, price, weight, image }) => ({
    id, name, type, description, tags, price, weight, image,
  }));
  res.json({ success: true, data: summary });
});

router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }
  res.json({ success: true, data: product });
});

module.exports = router;
