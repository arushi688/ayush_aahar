const express = require('express');
const router = express.Router();
const qualityData = require('../data/quality');

router.get('/', (req, res) => {
  res.json({ success: true, data: qualityData });
});

module.exports = router;
