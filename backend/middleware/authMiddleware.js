// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;

    console.log('🔐 Auth Middleware - Headers:', req.headers.authorization);

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    console.log('🔐 Auth Middleware - Token extracted:', !!token);

    if (!token) {
      console.log('❌ No token provided');
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      console.log('🔐 Auth Middleware - Decoded token:', decoded);
      
      req.userId = decoded.userId;
      console.log('🔐 Auth Middleware - User ID set:', req.userId);
      
      if (!req.userId) {
        console.log('❌ No userId in decoded token');
        return res.status(401).json({ message: 'Invalid token structure' });
      }
      
      next();
    } catch (error) {
      console.log('❌ Token verification error:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } catch (error) {
    console.log('❌ Auth middleware error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};