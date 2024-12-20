const typeDefs = `
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
  }

  type Auth {
    token: String
    user: User
  }

  type Category {
    _id: ID
    name: String
    description: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    price: Float
    quantity: Int
    category: Category
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
    products(category: ID): [Product]
    orders: [Order]
    categories: [Category]
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
    login(
    email: String!
    password: String!
    ): Auth
  }

  input OrderProductInput {
    productId: ID!
    quantity: Int!
  }
`;

module.exports = typeDefs;
