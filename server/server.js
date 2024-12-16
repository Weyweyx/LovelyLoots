const express = require("express");
const { ApolloServer } = require("@apollo/server");
const path = require("path");
const typeDefs = require("./schemas/typeDefs");
const resolvers = require("./schemas/resolvers");
const mongoose = require("./config/connection");
const { authMiddleware } = require("./middleware/authMiddleware");
const { expressMiddleware } = require("@apollo/server/express4");

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const cors = require('cors');
app.use(cors());

// Start the Apollo server and apply middleware to Express

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve up static assets
  // app.use('/images', express.static(path.join(__dirname, '../client/images')));

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  mongoose.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Start Apollo server

startApolloServer();
