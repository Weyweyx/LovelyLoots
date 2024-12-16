const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
    default: 'default-image.png',
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;