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
        {
          name: "Jewelry",
          description: "Antique and vintage necklaces, earrings etc.",
        },
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
        {
          firstName: "Caroline",
          lastName: "Bost",
          email: "bostcaroline412@gmail.com",
          password: "password123",
        },
        {
          firstName: "Jonathan",
          lastName: "Torres",
          email: "techmylocker@gmail.com",
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
          category: categories[4]._id,
          seller: users[1]._id,
          image: "vintage-watch.png",
        },
        {
          name: "Antique Chair",
          description: "Beautiful handcrafted chair from the 1800s.",
          price: 400.0,
          quantity: 5,
          category: categories[1]._id,
          seller: users[1]._id,
          image: "antique-chair.png",
        },
        {
          name: "Vintage Polaroid Camera",
          description: "Fully functional 1980s Polaroid Impulse camera",
          price: 200.0,
          quantity: 1,
          category: categories[6]._id,
          seller: users[3]._id,
          image: "polaroid-cam-img.jpg",
        },
        {
          name: "Antique Floral Picture Frame",
          description: "1950s antique circular picture frame",
          price: 60.0,
          quantity: 1,
          category: categories[2]._id,
          seller: users[2]._id,
          image: "floral-frame-img.jpg",
        },
        {
          name: "Antqiue Pearl Ring",
          description:
            "One of a kind ring from the 1920s with three real pearls.",
          price: 875.0,
          quantity: 1,
          category: categories[5]._id,
          seller: users[3]._id,
          image: "pear-ring-img.jpg",
        },
        {
          name: "Vintage Embroidered Cats Frame",
          description: "Handmade cat embroidery.",
          price: 85.0,
          quantity: 1,
          category: categories[2]._id,
          seller: users[4]._id,
          image: "cat-emb-img.jpg",
        },
        {
          name: "Antique Porcelain Jewelry Box",
          description: "Beautiful porcelain jewelry box with two doves.",
          price: 250.0,
          quantity: 1,
          category: categories[5]._id,
          seller: users[2]._id,
          image: "jewelry-box-img.jpg",
        },
        {
          name: "Antique Crystal Dish",
          description: "100 year old crystal plate in outstanding condition.",
          price: 650.0,
          quantity: 1,
          category: categories[3]._id,
          seller: users[4]._id,
          image: "../../client/src/assets/images/crystal-dish-img.jpg",
        },
        {
          name: "Vintage Cola Bottle Opener Floral Painted Wooden Plaque",
          description: "Wooden plaque wall decor made with a real vintage Coca-Cola bottle opener and beautifully painted flower.",
          price: 100.0,
          quantity: 1,
          category: categories[2]._id,
          seller: users[5]._id,
          image: "whiteflower-bottle-plaque",
        },
        {
          name: "Vintage Coca-Cola Bottle Opener Painted Wooden Plaque",
          description: "Wooden plaque wall decor made with a real vintage Coca-Cola bottle opener and a hand-painted frog.",
          price: 100.0,
          quantity: 1,
          category: categories[2]._id,
          seller: users[5]._id,
          image: "frog-bottle-plaque",
        },
        {
          name: "Vintage Cow Cast Iron Skillet Decor",
          description: "Cast iron skillet wall decor with a cow imprinted wall decor.",
          price: 175.0,
          quantity: 1,
          category: categories[2]._id,
          seller: users[6]._id,
          image: "cow-skillet",
        },
        {
          name: "Antique Farmer Cast Iron Skillet Decor",
          description: "Wonderful condition cast iron made farmer and hand-painted.",
          price: 300.0,
          quantity: 1,
          category: categories[2]._id,
          seller: users[6]._id,
          image: "farmer-skillet",
        },
        {
          name: "Vintage Snowman Cast Iron Skillet Decor",
          description: "Joyful Snowman 'Let it snow' imprinted cast iron skillet wall decor.",
          price: 175.0,
          quantity: 1,
          category: categories[2]._id,
          seller: users[6]._id,
          image: "snowman-skillet",
        },
        {
          name: "Antique Glass Citrus Juicer",
          description: "1920s antique citrust hand juicer in perfect condition.",
          price: 450.0,
          quantity: 1,
          category: categories[3]._id,
          seller: users[4]._id,
          image: "citrus-juicer",
        },
        {
          name: "Antique Hand-Painted Kitchenware",
          description: "Small, good condition, beautifully floral painted antique pot dating back to early 1900s.",
          price: 700.0,
          quantity: 1,
          category: categories[3]._id,
          seller: users[3]._id,
          image: "small-pot",
        },
        {
          name: "Antique Hand-Painted Kitchenware",
          description: "Large, orange floral painted antique pot, dating back to early 1900s.",
          price: 775.0,
          quantity: 1,
          category: categories[3]._id,
          seller: users[3]._id,
          image: "large-pot",
        },
        {
          name: "Vintage Fossil Coin Purse",
          description: "Good condition, genuine Fossil coin pursel from mid 1950s.",
          price: 450.0,
          quantity: 1,
          category: categories[4]._id,
          seller: users[4]._id,
          image: "fossil-purse",
        },
        {
          name: "Antique Floral Rosary",
          description: "Beautiful antique white pearl and pink rose rosary.",
          price: 175.0,
          quantity: 1,
          category: categories[5]._id,
          seller: users[6]._id,
          image: "rose-rosary",
        },
        {
          name: "Antique Heart Locket",
          description: "Heart locket made in the 1930s in perfect condition.",
          price: 300.0,
          quantity: 1,
          category: categories[5]._id,
          seller: users[4]._id,
          image: "heart-locket",
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
