//----------------------------- Chapter 4 : REST Api's & CRUD-------------------------------------------------//

const fs = require('fs');
const express = require('express');
const morgan = require('morgan');


const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const products = data.products;


const server = express();

server.use(express.json());
server.use(express.static('public-folder'));
server.use(morgan('dev'));



//REST API's - C R U D

//Create Product
server.post('/products', (req, res) => {
    products.push(req.body);
    res.status(201).json(req.body);
});

//Read Products
server.get('/products', (req, res) => {
    res.json(products);
});

//Read Product by ID
server.get('/products/:id', (req, res) => {
    const id = +req.params.id;
    const product = products.find(p => p.id === id);
    res.json(product);
});

//Update Product
server.put('/products/:id', (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex(p => p.id === id);
    products.splice(productIndex, 1, { id: id, ...req.body});
    res.status(202).json({ 'msg': "Product Updated Successfully" });
});

//Patch Product
server.patch('/products/:id', (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex(p => p.id === id);
    const product = products[productIndex];
    products.splice(productIndex, 1, {...product, ...req.body});
    res.status(202).json({ 'data': products[productIndex], 'msg': "Product Details Updated Successfully" });
});


//Delete Product
server.delete('/products/:id', (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex(p => p.id === id);
    const product = products[productIndex];
    products.splice(productIndex, 1);
    res.json({ 'data' : product,'msg': "Product Deleted Successfully" });
});



server.listen(8080, (req, res) => {
    console.log('Server Started');
});