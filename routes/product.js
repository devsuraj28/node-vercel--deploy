const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

router.post('/', productController.createProduct)
    .get('/', productController.getAllProducts)
    .get('/:id', productController.getProductByID)
    .put('/:id', productController.replaceProduct)
    .patch('/:id', productController.updateProduct)
    .delete('/:id', productController.deleteProduct);


exports.router = router;
