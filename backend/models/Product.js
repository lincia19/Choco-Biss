// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  image: [{
    type: String
  }],
  category: {
    type: String,
    required: true
  },
  stockQuantity: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [String],
  weight: String,
  ingredients: [String],
  nutritionalInfo: {
    calories: Number,
    sugar: Number,
    fat: Number
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);