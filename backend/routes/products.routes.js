// const express = require('express');
// const router = express.Router();
// const productsController = require('../controllers/products.controller');
// const authMiddleware = require('../middleware/auth.middleware');

// // Public route: get all products
// router.get('/', productsController.getProducts);

// // Admin routes: create/update/delete (check admin in middleware)
// router.post('/', authMiddleware.verifyAdmin, productsController.createProduct);
// router.put('/:id', authMiddleware.verifyAdmin, productsController.updateProduct);
// router.delete('/:id', authMiddleware.verifyAdmin, productsController.deleteProduct);

// // Recommendations
// router.get('/recommend', authMiddleware.verifyJWT, productsController.recommendProducts);

// module.exports = router;
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', productsController.getProducts);

// Admin-only routes
router.post('/', authMiddleware.verifyAdmin, productsController.createProduct);
router.put('/:id', authMiddleware.verifyAdmin, productsController.updateProduct);
router.delete('/:id', authMiddleware.verifyAdmin, productsController.deleteProduct);

module.exports = router;
