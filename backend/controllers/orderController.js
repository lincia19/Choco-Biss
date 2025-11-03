// controllers/orderController.js - COMPLETE REWRITE
const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    console.log('🛒 Creating order - Body:', req.body);
    console.log('🛒 User ID from auth:', req.userId);

    const { items, totalAmount, paymentMethod, shippingAddress } = req.body;

    if (!items || !totalAmount || !paymentMethod) {
      return res.status(400).json({ 
        message: 'Missing required fields: items, totalAmount, paymentMethod' 
      });
    }

    // Create order
    const order = new Order({
      user: req.userId,
      items: items,
      totalAmount: totalAmount,
      deliveryFee: 10, // Default delivery fee
      paymentMethod: paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      orderStatus: 'pending',
      shippingAddress: shippingAddress || {}
    });

    const savedOrder = await order.save();
    console.log('✅ Order saved:', savedOrder._id);

    res.status(201).json({
      message: 'Order created successfully',
      order: savedOrder
    });
  } catch (error) {
    console.log('❌ Order creation error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .sort({ createdAt: -1 })
      .populate('items.product', 'name price image');
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.product', 'name price image');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: status },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};