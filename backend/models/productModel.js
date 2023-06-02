import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name "],
        trim: true,
    },
    author: {
        type: String,
        trim: true,
        default: "Unknown Author"
    },
    description: {
        type: String,
        required: [true, "Please enter product description"]
    },
    price: {
        type: Number,
        required: [true, "PLease enter product price"],
        maxLength: [8, "Price cannot exceed 8 characters"]
    },
    available: {
        type: Boolean,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: [true, "Please select a category"],
    },
    stock: {
        type: Number,
        required: [true, "Please Enter Product Stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

export const Product = mongoose.model("Product", productSchema);
