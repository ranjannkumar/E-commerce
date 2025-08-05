const express = require('express');
const {
    getAllProducts,
    getProductById,
    createProduct
} = require('../controllers/testProductController');

const router = express.Router();

// Route for GET /products (and /products?category=...)
router.route('/products').get(getAllProducts);

// Route for GET /products/:id
router.route('/products/:id').get(getProductById);

// Route for POST /products 
router.route('/products').post(createProduct);

module.exports = router;