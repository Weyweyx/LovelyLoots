const { User, Product, Order } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { generateToken } = require('../utils/tokenUtils');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().select('-password');
    },
    user: async (_, { _id }) => {
      return User.findById(_id).select('-password');
    },
    products: async () => {
      return Product.find().populate('seller');
    },
    orders: async (_, { userId }) => {
      return Order.find({ user: userId }).populate({
        path: 'products.product',
        model: 'Product',
      });
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = generateToken(user);
      return { token, user };
    },
    addUser: async (_, args) => {
      const user = await User.create(args);
      const token = generateToken(user);
      return { token, user };
    },
    addOrder: async (_, { products }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }

      const order = await Order.create({
        user: context.user._id,
        products,
        total: products.reduce((acc, item) => acc + item.price * item.quantity, 0),
      });

      return order;
    },
    addProduct: async (_, args, context) => {
      if (!context.user || context.user.role !== 'seller') {
        throw new AuthenticationError('Only sellers can add products');
      }

      const product = await Product.create({ ...args, seller: context.user._id });
      return product;
    },
    deleteProduct: async (_, { id }, context) => {
      if (!context.user || context.user.role !== 'seller') {
        throw new AuthenticationError('Only sellers can delete products');
      }

      const product = await Product.findOneAndDelete({ _id: id, seller: context.user._id });
      if (!product) {
        throw new Error('Product not found or unauthorized');
      }

      return product;
    },
  },
};

module.exports = resolvers;
