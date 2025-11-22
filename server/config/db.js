// Load environment variables from the .env file
require('dotenv').config();

module.exports = {
  // Get the MongoDB connection string from the .env file
  URI: process.env.MONGO_URI
};
