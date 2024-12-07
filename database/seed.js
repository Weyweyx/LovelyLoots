const mongoose = require("mongoose");
const Product = require("../server/models/Product");
const Category = require("../server/models/Category");
const User = require("../server/models/User");
const Order = require("../server/models/Order");

const seedDatabase = async () => {
  try {
    // Connect to MongoDB

    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/lovely-loots", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Clear existing data

    await Product.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});
    console.log("Database cleared");

    // Seed categories

    const categories = await Category.insertMany([
      { name: "fashion", description: "Antique clothing and accessories." },
      { name: "home", description: "Vintage furniture and decor." },
      { name: "toys", description: "Collectible antique toys." },
      { name: "others", description: "Miscellaneous antique items." },
    ]);
    console.log("Categories seeded");

    // Seed users

    const users = await User.insertMany([
      {
        username: "customer1",
        email: "customer1@example.com",
        password: "password123",
        role: "customer",
      },
      {
        username: "seller1",
        email: "seller1@example.com",
        password: "password123",
        role: "seller",
      },
    ]);
    console.log("Users seeded");

    // Seed products

    const products = await Product.insertMany([
      {
        name: "Vintage Watch",
        description: "A timeless piece from the 1950s.",
        price: 250.0,
        stock: 10,
        category: categories[0]._id,
        seller: users[1]._id,
        image: "vintage-watch.png",
      },
      {
        name: "Antique Chair",
        description: "Beautiful handcrafted chair from the 1800s.",
        price: 450.0,
        stock: 5,
        category: categories[1]._id,
        seller: users[1]._id,
        image: "antique-chair.png",
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

    mongoose.connection.close();
    console.log("Seeding complete. Connection closed.");
  } catch (err) {
    console.error("Error during seeding:", err);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();
