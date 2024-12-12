const { gql } = require('apollo-server-express');

// Define GraphQL schema

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
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

  type Order {
    _id: ID
    user: User
    products: [Product]
    total: Float
    status: String
    createdAt: String
  }

  type Query {
    users: [User]
    products: [Product]
    orders: [Order]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): User
    addProduct(name: String!, description: String!, price: Float!, category: String!): Product
  }
`;

module.exports = typeDefs;
