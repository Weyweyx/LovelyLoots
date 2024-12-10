const { User, Product, Order } = require('../models');

const resolvers = {
  Query: {
    users: async () => User.find(),
    products: async () => Product.find(),
    orders: async () => Order.find(),
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      return user;
    },
    addProduct: async (parent, args) => {
      const product = await Product.create(args);
      return product;
    },
  },
};

module.exports = resolvers;
