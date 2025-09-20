const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/health', async (req, res) => {
  const dbState = mongoose.connection.readyState;
  res.json({
    service: 'up',
    db: dbState === 1 ? 'connected' : 'disconnected'
  });
});

module.exports = router;
