const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.warn("⚠️ MONGO_URI not configured. Running without MongoDB.");
      return;
    }

    const connection = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(
      `MongoDB connected: ${connection.connection.host}`
    );
  } catch (error) {
    console.error(
      "⚠️ MongoDB connection failed:",
      error.message
    );

    console.warn(
      "⚠️ Continuing without MongoDB. API and ML services remain available."
    );
  }
};

module.exports = connectDB;
