const mongoose = require("mongoose");
const Product = require("../models/Product");
const Category = require("../models/Category");
const User = require("../models/User");
const Order = require("../models/Order");
const cleanDB = require("./cleanDB");
const db = require("../config/connection");


const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    db.once("open", async () => {
      // Clear existing data

      await cleanDB("Product", "products");
      await cleanDB("Category", "categories");
      await cleanDB("User", "users");
      await cleanDB("Order", "orders");
      console.log("Database cleared");

      // Seed categories

      const categories = await Category.insertMany([
        {
          name: "Clothing",
          description: "Vintage and antique clothing.",
        },
        { name: "Furniture", description: "Vintage furniture." },
        { name: "Decor", description: "Vintage decor and antiques." },
        { name: "Kitchenware", description: "Vintage kitchenware." },
        { name: "Accessories", description: "Vinatge watches, glasses etc." },
        { name: "Jewelry", description: "Antique and vintage necklaces, earrings etc." },
        { name: "All", description: "All vintage products." },
        { name: "Other", description: "Miscellaneous vintage items." },
      ]);
      console.log("Categories seeded");

      // Seed users

      const users = await User.insertMany([
        {
          firstName: "Andrew",
          lastName: "Bautista",
          email: "customer1@example.com",
          password: "password123",
        },
        {
          firstName: "Sam",
          lastName: "Mina",
          email: "seller1@example.com",
          password: "password123",
        },
        {
          firstName: "Klaudia",
          lastName: "Paw",
          email: "patkpaw@gmail.com",
          password: "password123",
        },
        {
          firstName: "Maxine",
          lastName: "Rose",
          email: "mcrb1199@gmail.com",
          password: "password123",
        },
        {
          firstName: "Ethan",
          lastName: "Morrical",
          email: "neondarkness711@gmail.com",
          password: "password123",
        },
      ]);
      console.log("Users seeded");

      // Seed products

      const products = await Product.insertMany([
        {
          name: "Vintage Watch",
          description: "A timeless piece from the 1950s.",
          price: 250.0,
          quantity: 1,
          category: categories[4,6]._id,
          seller: users[1]._id,
          image: "vintage-watch.png",
        },
        {
          name: "Antique Chair",
          description: "Beautiful handcrafted chair from the 1800s.",
          price: 400.0,
          quantity: 5,
          category: categories[1,6]._id,
          seller: users[1]._id,
          image: "antique-chair.png",
        },
        {
          name: "Vintage Polaroid Camera",
          description: "Fully functional 1980s Polaroid Impulse camera",
          price: 200.00,
          quantity: 1,
          category: categories[6,7]._id,
          seller: users[3]._id,
          image: "polaroid-cam-img.jpg",
        },
        {
          name: "Antique Floral Picture Frame",
          description: "1950s antique circular picture frame",
          price: 60.00,
          quantity: 1,
          category: categories[2,6],
          seller: users[2]._id,
          image: "floral-frame-img.jpg",
        },
        {
          name: "Antqiue Pearl Ring",
          description: "One of a kind ring from the 1920s with three real pearls.",
          price: 875.00,
          quantity: 1,
          category: categories[5,6],
          seller: users[3]._id,
          image: "pear-ring-img.jpg",
        },
        {
          name: "Vintage Embroidered Cats Frame",
          description: "Handmade cat embroidery.",
          price: 85.00,
          quantity: 1,
          category: categories[2,6]._id,
          seller: users[4]._id,
          image: "cat-emb-img.jpg",
        },
        {
          name: "Antique Porcelain Jewelry Box",
          description: "Beautiful porcelain jewelry box with two doves.",
          price: 250.00,
          quantity: 1,
          category: categories[5,6,7]._id,
          seller: users[2]._id,
          image: "jewelry-box-img.jpg",
        },
        {
          name: "Antique Crystal Dish",
          description: "100 year old crystal plate in outstanding condition.",
          price: 200,
          quantity: 1,
          category: categories[3,6]._id,
          seller: users[4]._id,
          image: "crystal-dish-img.jpg",
        },
      ]);
      console.log("Products seeded");

      // Seed orders

      await Order.create({
        user: users[0]._id,
        products: [
          {
            product: products[0]._id,
            quantity: 2,
          },
        ],
        total: 500.0,
        status: "pending",
      });
      console.log("Orders seeded");

      // Close connection

      process.exit();
      console.log("Seeding complete. Connection closed.");
    });
  } catch (err) {
    console.error("Error during seeding:", err);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();
