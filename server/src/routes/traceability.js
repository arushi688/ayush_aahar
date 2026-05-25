const express = require('express');
const router = express.Router();
const traceabilityData = require('../data/traceability');

router.get('/', (req, res) => {
  res.json({ success: true, data: traceabilityData });
});

module.exports = router;
