const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection with updated options
const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    console.log('🔄 Attempting to connect to MongoDB...');
    
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Increase timeout to 10 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      // Remove deprecated options
    });
    
    console.log('✅ MongoDB connected successfully to LOCAL database');
    console.log('📁 Database:', conn.connection.name);
    console.log('📍 Host:', conn.connection.host);
    console.log('📊 Connection Status: Connected');
    
    return conn;
  } catch (error) {
    console.log('❌ MongoDB connection error:', error.message);
    console.log('💡 Make sure MongoDB is running locally');
    console.log('💡 Run: mongod --dbpath C:\\data\\db (Windows)');
    console.log('💡 Or: brew services start mongodb-community (macOS)');
    console.log('💡 Or: sudo systemctl start mongod (Linux)');
    
    // Retry connection after 5 seconds
    console.log('🔄 Retrying connection in 5 seconds...');
    setTimeout(connectDB, 5000);
    
    return null;
  }
};

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Mongoose disconnected from MongoDB');
  console.log('🔄 Attempting to reconnect...');
  setTimeout(connectDB, 5000);
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('⛔ MongoDB connection closed through app termination');
  process.exit(0);
});

// Import Models
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

// Initialize sample products if database is empty
const initializeProducts = async () => {
  try {
    const productCount = await Product.countDocuments();
    
    if (productCount === 0) {
      console.log('📦 No products found. Creating sample products...');
      
      const sampleProducts = [
        {
          Name: "Milk Chocolate Bar",
          description: "Creamy milk chocolate bar with smooth texture",
          price: 2.99,
          originalPrice: 3.99,
          image: ["/images/chocolate-bar.jpg"],
          category: "chocolate-bars",
          stockQuantity: 50,
          isActive: true,
          weight: "100g",
          ingredients: ["cocoa", "milk", "sugar"]
        },
        {
          Name: "Dark Chocolate Truffles",
          description: "Luxury dark chocolate truffles with cocoa filling",
          price: 12.99,
          originalPrice: 15.99,
          image: ["/images/truffles.jpg"],
          category: "truffles",
          stockQuantity: 30,
          isActive: true,
          weight: "200g",
          ingredients: ["dark cocoa", "cream", "sugar"]
        },
        {
          Name: "White Chocolate Cookies",
          description: "Crunchy cookies with white chocolate chips",
          price: 8.99,
          originalPrice: 10.99,
          image: ["/images/cookies.jpg"],
          category: "cookies",
          stockQuantity: 25,
          isActive: true,
          weight: "150g",
          ingredients: ["flour", "white chocolate", "butter"]
        },
        {
          Name: "Chocolate Gift Box",
          description: "Assorted chocolate gift box perfect for presents",
          price: 24.99,
          originalPrice: 29.99,
          image: ["/images/gift-box.jpg"],
          category: "gift-sets",
          stockQuantity: 15,
          isActive: true,
          weight: "500g",
          ingredients: ["assorted chocolates"]
        }
      ];
      
      await Product.insertMany(sampleProducts);
      console.log('✅ Sample products created successfully!');
    } else {
      console.log(`📦 Found ${productCount} existing products in database`);
    }
  } catch (error) {
    console.log('❌ Error creating sample products:', error);
  }
};

// Initialize database connection and products
const startServer = async () => {
  // Connect to database first
  const dbConnection = await connectDB();
  
  if (dbConnection) {
    // Initialize products after successful connection
    await initializeProducts();
  }
  
  // Start the server regardless of DB connection
  const PORT = process.env.PORT || 5000;
  
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on port ${PORT}`);
    console.log(`📍 Local: http://localhost:${PORT}`);
    console.log(`🏥 Health: http://localhost:${PORT}/api/health`);
    console.log(`🗄️ Database: Local MongoDB (127.0.0.1:27017/chocobiss)`);
    console.log(`📊 Status: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
  });
};

// Start the application
startServer();

// API Routes

// Get all products from database
app.get('/api/products', async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database not connected' });
    }
    
    const products = await Product.find({});
    console.log('📦 Products fetched from DB:', products.length);
    res.json(products);
  } catch (error) {
    console.log('❌ Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Sync products from frontend to MongoDB
app.post('/api/products/sync', async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database not connected' });
    }
    
    const { products } = req.body;
    
    if (!products || !Array.isArray(products)) {
      return res.status(400).json({ message: 'Products array is required' });
    }

    console.log(`🔄 Syncing ${products.length} products to database...`);

    // Clear existing products
    await Product.deleteMany({});
    console.log('🧹 Cleared existing products');

    // Transform products to match your Product schema
    const productsToSave = products.map((product, index) => {
      // Handle stockQuantity
      let stockQuantity;
      if (Array.isArray(product.stockQuantity)) {
        const firstValid = product.stockQuantity.find(val => !isNaN(Number(val)) && Number(val) > 0);
        stockQuantity = firstValid ? Number(firstValid) : 50;
      } else if (product.stockQuantity && !isNaN(Number(product.stockQuantity))) {
        stockQuantity = Number(product.stockQuantity);
      } else if (product.quantity && !isNaN(Number(product.quantity))) {
        stockQuantity = Number(product.quantity);
      } else {
        stockQuantity = 50;
      }

      // Handle price
      let price;
      if (Array.isArray(product.price)) {
        const firstValid = product.price.find(val => !isNaN(Number(val)) && Number(val) > 0);
        price = firstValid ? Number(firstValid) : 0;
      } else if (product.price && !isNaN(Number(product.price))) {
        price = Number(product.price);
      } else {
        price = 0;
      }

      // Handle originalPrice
      let originalPrice;
      if (Array.isArray(product.originalPrice)) {
        const firstValid = product.originalPrice.find(val => !isNaN(Number(val)) && Number(val) > 0);
        originalPrice = firstValid ? Number(firstValid) : price;
      } else if (product.originalPrice && !isNaN(Number(product.originalPrice))) {
        originalPrice = Number(product.originalPrice);
      } else {
        originalPrice = price;
      }

      return {
        Name: product.name || product.Name || `Chocolate Product ${index + 1}`,
        description: product.description || 'Delicious chocolate product',
        price: price,
        originalPrice: originalPrice,
        image: Array.isArray(product.image) ? product.image : [product.image || '/images/default.jpg'],
        category: product.category || 'chocolate',
        stockQuantity: stockQuantity,
        isActive: true,
        weight: product.weight || '100g',
        ingredients: Array.isArray(product.ingredients) ? product.ingredients : ['cocoa', 'sugar']
      };
    });

    const savedProducts = await Product.insertMany(productsToSave);
    
    console.log(`✅ Successfully synced ${savedProducts.length} products to MongoDB`);
    
    res.json({
      message: `Successfully synced ${savedProducts.length} products to database`,
      count: savedProducts.length
    });
  } catch (error) {
    console.log('❌ Error syncing products:', error);
    res.status(500).json({ 
      message: 'Error syncing products',
      error: error.message 
    });
  }
});

// User registration
app.post('/api/auth/signup', async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database not connected' });
    }
    
    const { name, email, password } = req.body;
    console.log('👤 Signup attempt:', email);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name, email, password });
    await user.save();

    console.log('✅ User created in database:', user._id);

    res.json({
      message: 'User registered successfully',
      token: 'jwt-token-' + Date.now(),
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.log('❌ Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

// User login
app.post('/api/auth/login', async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database not connected' });
    }
    
    const { email, password } = req.body;
    console.log('🔐 Login attempt:', email);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    console.log('✅ Login successful for user:', user._id);

    res.json({
      message: 'Login successful',
      token: 'jwt-token-' + Date.now(),
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.log('❌ Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Create order - saves to database
// Create order - saves to database - FIXED VERSION
app.post('/api/orders', async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database not connected' });
    }
    
    console.log('📦 Creating order in database...');
    console.log('📨 Order data received:', JSON.stringify(req.body, null, 2));

    const { user, items, totalAmount, paymentMethod, shippingAddress } = req.body;
    
    // Validate required fields
    if (!user || !items || !totalAmount || !paymentMethod || !shippingAddress) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ 
        message: 'Missing required fields',
        received: req.body
      });
    }

    // Create order - let Mongoose handle orderId generation
    const orderData = {
      user: user,
      items: items.map(item => ({
        product: item.product || `product-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        name: item.name || 'Unknown Product',
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 1,
        image: item.image || "/default-image.jpg"
      })),
      totalAmount: Number(totalAmount),
      paymentMethod: paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      orderStatus: 'pending',
      shippingAddress: shippingAddress
    };

    console.log('📝 Creating order with data:', orderData);

    // Create and save order - Mongoose pre-save hook will generate orderId
    const order = new Order(orderData);
    const savedOrder = await order.save();
    
    console.log('✅ ORDER SAVED TO DATABASE SUCCESSFULLY!');
    console.log('📋 Order ID:', savedOrder.orderId);
    console.log('💰 Payment Method:', savedOrder.paymentMethod);
    console.log('📦 Items count:', savedOrder.items.length);
    console.log('👤 User:', savedOrder.user);

    res.json({
      message: 'Order created successfully',
      order: savedOrder,
      orderId: savedOrder.orderId
    });
  } catch (error) {
    console.log('❌ ORDER CREATION ERROR:', error);
    
    // More specific error handling
    if (error.code === 11000) {
      // Duplicate key error (orderId collision)
      return res.status(400).json({ 
        message: 'Order ID conflict. Please try again.',
        error: 'Duplicate order ID'
      });
    }
    
    res.status(500).json({ 
      message: 'Error creating order',
      error: error.message 
    });
  }
});
// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database not connected' });
    }
    
    const orders = await Order.find({});
    console.log('📋 Orders fetched from DB:', orders.length);
    res.json(orders);
  } catch (error) {
    console.log('❌ Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Get all orders (for debugging)
app.get('/api/orders/all', async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database not connected' });
    }
    
    const orders = await Order.find({});
    console.log(`📋 Found ${orders.length} orders in database`);
    
    res.json({
      count: orders.length,
      orders: orders
    });
  } catch (error) {
    console.log('❌ Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Health check with DB status
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  
  res.json({ 
    status: 'OK', 
    database: dbStatus,
    message: dbStatus === 'Connected' ? 'Server is running on local MongoDB!' : 'Server running but MongoDB disconnected',
    connection: '127.0.0.1:27017/chocobiss',
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  
  res.json({ 
    message: '🍫 Choco-Biss API is running!',
    database: dbStatus,
    connection: {
      host: '127.0.0.1',
      port: 27017,
      database: 'chocobiss',
      status: dbStatus
    },
    endpoints: {
      login: 'POST /api/auth/login',
      signup: 'POST /api/auth/signup', 
      products: 'GET /api/products',
      orders: 'POST /api/orders',
      health: 'GET /api/health'
    }
  });
});