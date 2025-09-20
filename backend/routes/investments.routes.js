// const express = require('express');
// const router = express.Router();
// const investmentsController = require('../controllers/investments.controller');
// const authMiddleware = require('../middleware/auth.middleware');

// router.post('/', authMiddleware.verifyJWT, investmentsController.invest);
// router.get('/portfolio', authMiddleware.verifyJWT, investmentsController.getPortfolio);

// module.exports = router;
const express = require('express');
const router = express.Router();
const investmentsController = require('../controllers/investments.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware.verifyJWT, investmentsController.invest);
router.get('/portfolio', authMiddleware.verifyJWT, investmentsController.getPortfolio);

module.exports = router;
