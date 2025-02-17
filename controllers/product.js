const Products = require('../models/product');

exports.createProduct = async (req, res) => {
    try {
        const product = new Products.productSchema(req.body);
        const newProduct = await product.save();
        res.status(201).json({ message: "Product created successfully", data: newProduct });
    } catch (error) {
        res.status(400).json({ message: "Failed to create product", error: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Products.productSchema.find();
        res.status(200).json({ message: "Products retrieved successfully", data: products });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch products", error: error.message });
    }
};

exports.getProductByID = async (req, res) => {
    try {
        const product = await Products.productSchema.findById({'_id':req.params.id});
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product retrieved successfully", data: product });
    } catch (error) {
        res.status(400).json({ message: "Invalid product ID", error: error.message });
    }
};

exports.replaceProduct = async (req, res) => {
    try {
        const product = await Products.productSchema.findOneAndReplace(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: false }
        );
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product replaced successfully", data: product });
    } catch (error) {
        res.status(400).json({ message: "Failed to replace product", error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Products.productSchema.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully", data: product });
    } catch (error) {
        res.status(400).json({ message: "Failed to update product", error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Products.productSchema.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Failed to delete product", error: error.message });
    }
};
