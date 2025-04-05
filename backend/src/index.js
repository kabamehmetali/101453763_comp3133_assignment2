const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { verifyToken } = require('./middleware/auth');

const app = express();

// Add this line to handle all OPTIONS requests for CORS
app.options('*', cors());

// Use explicit CORS configuration to allow all origins for testing
app.use(cors({ origin: '*' }));

// Increase payload limit for JSON and URL-encoded data
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(verifyToken);

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ user: req.user }),
    introspection: true, // Enable introspection for debugging
  });
  await server.start();
  server.applyMiddleware({ app });

  const httpServer = http.createServer(app);
  const PORT = process.env.PORT || 6000;
  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
  });
}

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    startServer();
  })
  .catch(err => console.error('MongoDB connection error:', err));
