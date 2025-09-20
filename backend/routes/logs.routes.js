const express = require('express');
const router = express.Router();
const logsController = require('../controllers/logs.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware.verifyJWT, logsController.logTransaction);
router.get('/', authMiddleware.verifyJWT, logsController.getLogs);
router.get('/summary', authMiddleware.verifyJWT, logsController.getErrorSummary);

module.exports = router;
