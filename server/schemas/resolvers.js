const { User, Product, Order } = require("../models");

const resolvers = {
  Query: {
    users: async () => User.find(),
    user: async (_, { _id }) => User.findById(_id),
    products: async (_, { category }) =>
      category ? Product.find({ category }) : Product.find(),
    orders: async () => Order.find().populate("user").populate("products.product"),
  },
  Mutation: {
    addUser: async (_, args) => User.create(args),
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
