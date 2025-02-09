const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

router.post('/', productController.createProducts)
    .get('/', productController.getAllProducts)
    .get('/:id', productController.getproductByID)
    .put('/:id', productController.replaceProduct)
    .patch('/:id', productController.updateProduct)
    .delete('/:id', productController.deleteProduct);


exports.router = router;
