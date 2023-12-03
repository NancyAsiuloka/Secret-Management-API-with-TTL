const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path'); // Node.js path module for handling file paths

// Importing the route
const secretRoutes = require('./routes/secretRoutes');

// Configuration
dotenv.config();
const app = express();

// Middleware to parse JSON in request bodies
app.use(express.json());

// Use swagger-ui-express to serve Swagger documentation
const swaggerDocument = YAML.load(path.resolve(__dirname, 'swagger.yaml')); // Use path.resolve to handle file paths
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Use secretRoutes for handling secret-related routes
app.use('/api', secretRoutes);

// Mongoose setup and server start
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
      console.log(`Swagger documentation: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error) => {
    console.error(`Failed to connect to MongoDB: ${error}`);
    process.exit(1); // Exit the application if MongoDB connection fails
  });
