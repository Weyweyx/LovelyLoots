const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const path = require('path');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');
const mongoose = require ('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

/* const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/lovely-loots', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 mongoose.connection('connected', () =>
  console.log('Connected to MongoDB')
);
mongoose.connection('error', (err) =>
  console.error('MongoDB connection error:', err)
); */

// Enable CORS for requests coming from the frontend running on localhost:5173

app.use(cors({ origin: 'http://localhost:5173' }));

// Middleware to parse incoming JSON data

app.use(express.json());

// Create an Apollo Server instance

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the Apollo server and apply middleware to Express

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  // Serve static files from the frontend build (if needed)

  app.use(express.static(path.join(__dirname, '../client/dist')));

  // Catch-all handler to serve the React app for non-API routes

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });

  // Start the server

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GraphQL path: http://localhost:${PORT}${server.graphqlPath}`);
  });
}

// Start Apollo server

startServer();
