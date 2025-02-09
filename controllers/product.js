const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const products = data.products;

exports.createProducts = (req, res) => {
    products.push(req.body);
    res.status(201).json(req.body);
}

exports.getAllProducts = (req, res) => {
    res.json(products);
}

exports.getproductByID = (req, res) => {
    const id = +req.params.id;
    const product = products.find(p => p.id === id);
    res.json(product);
};

exports.replaceProduct = (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex(p => p.id === id);
    products.splice(productIndex, 1, { id: id, ...req.body });
    res.status(202).json({ 'msg': "Product Updated Successfully" });
};

exports.updateProduct = (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex(p => p.id === id);
    const product = products[productIndex];
    products.splice(productIndex, 1, { ...product, ...req.body });
    res.status(202).json({ 'data': products[productIndex], 'msg': "Product Details Updated Successfully" });
};

exports.deleteProduct = (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex(p => p.id === id);
    const product = products[productIndex];
    products.splice(productIndex, 1);
    res.json({ 'data': product, 'msg': "Product Deleted Successfully" });
};
