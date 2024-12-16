const { User, Product, Order } = require("../models");
const { signToken, AuthenticationError, authMiddleware } = require("../middleware/authMiddleware");
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
// need to add category model 
const resolvers = {
  Query: {
    /* user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw AuthenticationError;
    }, */
    users: async () => User.find(),
    user: async (_, { _id }) => User.findById(_id),
    products: async (_, { category }) =>
      category ? Product.find({ category }) : Product.find(),
    orders: async () => Order.find().populate("user").populate("products.product"),
  },
  Mutation: {
    //addUser: async (_, args) => User.create(args),
    addUser: async (parent, { firstName, lastName, email, password }) => {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Create a new user
      const user = await User.create({ firstName, lastName, email, password });

      // Generate a token for the user
      const token = signToken(user);

      // Return the token and user object as part of Auth
      return {
        token,
        user,
      };
    },
    addProduct: async (_, args) => Product.create(args),
    addOrder: async (_, { userId, products, total, status }) => {
      const formattedProducts = products.map(({ productId, quantity }) => ({
        product: productId,
        quantity,
      }));

      const order = await Order.create({
        user: userId,
        products: formattedProducts,
        total,
        status,
      });

      return order.populate("user").populate("products.product");
    },
    deleteProduct: async (_, { id }) => {
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    },
  },
};

module.exports = resolvers;
