const typeDefs = `
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type Auth {
    token: String
    user: User
  }

  type Product {
    _id: ID
    name: String
    description: String
    price: Float
    stock: Int
    category: String
    seller: User
  }

  type OrderProduct {
    product: Product
    quantity: Int
  }

  type Order {
    _id: ID
    user: User
    products: [OrderProduct]
    total: Float
    status: String
    createdAt: String
  }

  type Query {
    users: [User]
    user(_id: ID!): User
    products(category: String): [Product]
    orders: [Order]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addProduct(
      name: String!
      description: String!
      price: Float!
      stock: Int!
      category: String!
      seller: ID!
    ): Product
    addOrder(
      userId: ID!
      products: [OrderProductInput!]!
      total: Float!
      status: String
    ): Order
    deleteProduct(id: ID!): Product
  }

  input OrderProductInput {
    productId: ID!
    quantity: Int!
  }
`;

module.exports = typeDefs;
