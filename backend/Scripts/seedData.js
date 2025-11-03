const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const products = [
  {
    name: "Banana Stick Chocolate",
    description: "Delicious and low calories",
    price: 100,
    images: ["banan_chocolate.jpg"],
    bestseller: true,
    stockQuantity: 50,
    ingredients: "Cocoa, banana, sugar, milk"
  },
  {
    name: "Brownie",
    description: "Delicious and low calories, 5 pieces",
    price: 150,
    images: ["Brownie.jpg"],
    bestseller: true,
    stockQuantity: 30,
    ingredients: "Cocoa, flour, sugar, eggs, butter"
  },
  {
    name: "Chocolate Bar",
    description: "Delicious and low calories",
    price: 200,
    images: ["Chocolate_Bar.jpg"],
    bestseller: true,
    stockQuantity: 100,
    ingredients: "Cocoa, sugar, milk, vanilla"
  },
  {
    name: "Chocolate Cake",
    description: "Delicious and low calories",
    price: 150,
    images: ["Chocolate_Cake.jpeg"],
    bestseller: true,
    stockQuantity: 20,
    ingredients: "Cocoa, flour, sugar, eggs, butter, cream"
  },
  {
    name: "Choco Balls",
    description: "Delicious and low calories, 5 pieces",
    price: 130,
    images: ["choco_balls.jpeg"],
    bestseller: true,
    stockQuantity: 60,
    ingredients: "Cocoa, sugar, milk, nuts"
  },
  {
    name: "Chocolate Cubes",
    description: "Bite-size rich cubes of chocolate",
    price: 120,
    images: ["chocolate_cubes.jpg"],
    bestseller: false,
    stockQuantity: 80,
    ingredients: "Cocoa, sugar, milk powder"
  },
  {
    name: "Chocolate Pie",
    description: "Soft and rich chocolate pie",
    price: 100,
    images: ["chocolate_Pie.jpeg"],
    bestseller: true,
    stockQuantity: 25,
    ingredients: "Cocoa, flour, sugar, butter, cream"
  },
  {
    name: "White Layer Cookie",
    description: "Crispy white chocolate cookie, 5 pieces",
    price: 200,
    images: ["Cookie_white.jpeg"],
    bestseller: true,
    stockQuantity: 40,
    ingredients: "White chocolate, flour, sugar, butter"
  },
  {
    name: "Mix Cookie",
    description: "Mix of white and dark cookies",
    price: 180,
    images: ["Mix_Cookie.jpeg"],
    bestseller: false,
    stockQuantity: 35,
    ingredients: "White chocolate, dark chocolate, flour, sugar"
  },
  {
    name: "Piece Cake",
    description: "Single piece chocolate cake",
    price: 90,
    images: ["piece_cake.jpg"],
    bestseller: false,
    stockQuantity: 15,
    ingredients: "Cocoa, flour, sugar, eggs, butter"
  },
  {
    name: "Strawberry Chocolate",
    description: "Choco-dipped strawberries",
    price: 160,
    images: ["stawbery_chocolate.jpg"],
    bestseller: true,
    stockQuantity: 45,
    ingredients: "Strawberries, dark chocolate, sugar"
  },
  {
    name: "White Choco Balls",
    description: "Creamy white chocolate balls",
    price: 140,
    images: ["white_choco_balls.jpg"],
    bestseller: true,
    stockQuantity: 55,
    ingredients: "White chocolate, sugar, milk powder"
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log(`${products.length} products seeded successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();