const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true
  },
  name: String,
  price: Number,
  quantity: Number,
  image: String
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  deliveryFee: {
    type: Number,
    default: 0
  },
  paymentMethod: {
    type: String,
    enum: ['cod', 'card'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'pending'
  },
  shippingAddress: {
    name: String,
    address: String,
    locality: String,
    house: String,
    pincode: String,
    district: String,
    state: String,
    phone: String
  },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  deliveryDate: Date
}, {
  timestamps: true
});

// Generate unique order ID before saving
orderSchema.pre('save', function(next) {
  console.log('🔄 Pre-save hook running for order...');
  if (!this.orderId) {
    // More unique ID generation with better randomness
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9).toUpperCase();
    this.orderId = `CB${timestamp}${random}`;
    console.log('📋 Generated orderId:', this.orderId);
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);