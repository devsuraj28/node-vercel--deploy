const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        minlength: [3, "Title must be at least 3 characters long"],
        maxlength: [100, "Title cannot exceed 100 characters"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        minlength: [10, "Description must be at least 10 characters long"],
        maxlength: [1000, "Description cannot exceed 1000 characters"]
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true,
        enum: {
            values: ["Electronics", "Clothing", "Books", "Furniture", "Other", "Beauty"],
            message: "Invalid category"
        }
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"]
    },
    discountPercentage: {
        type: Number,
        min: [0, "Discount cannot be negative"],
        max: [100, "Discount cannot exceed 100%"],
        default: 0
    },
    rating: {
        type: Number,
        min: [0, "Rating cannot be negative"],
        max: [5, "Rating cannot exceed 5"],
        default: 0
    },
    brand: {
        type: String,
        required: [true, "Brand is required"],
        trim: true
    },
    images: {
        type: [String], // Array of image URLs
        validate: {
            validator: function (arr) {
                return arr.every(url => /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(url));
            },
            message: "Invalid image URL format"
        },
        default: []
    },
    thumbnail: {
        type: String,
        required: [true, "Thumbnail is required"],
        validate: {
            validator: function (url) {
                return /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(url);
            },
            message: "Invalid thumbnail URL format"
        }
    }
}, { timestamps: true });

exports.productSchema = mongoose.model('Product', productSchema);
