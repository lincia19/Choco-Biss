// routes/productRoutes.js
const express = require('express');
const router = express.Router();

// Only basic routes - no errors
router.get('/', (req, res) => {
  res.json([ 
    { name: "Test Product 1", price: 100 },
    { name: "Test Product 2", price: 200 }
  ]);
});

router.get('/:id', (req, res) => {
  res.json({ 
    name: "Test Product", 
    price: 100,
    id: req.params.id 
  });
});

module.exports = router;