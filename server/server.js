const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const User = require("./models/User");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://ai-healthguard-sih-1.onrender.com",
      "https://ai-healthguard-sih.onrender.com",
    ],
    credentials: true,
  })
);
app.use(express.json());

connectDB();

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "AI HealthGuard API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "AI HealthGuard API is running",
  });
});

// LOGIN
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while logging in",
    });
  }
});


// FEVER ML PREDICTION
app.post("/api/predict-fever", async (req, res) => {
  try {
    const mlApiUrl = process.env.ML_API_URL || "http://127.0.0.1:8000";

    if (!mlApiUrl) {
      return res.status(500).json({
        success: false,
        message: "ML_API_URL is not configured",
      });
    }

    const response = await fetch(
      `${mlApiUrl}/predict-fever`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.status(200).json(data);

  } catch (error) {
    console.error(
      "Fever ML prediction error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Unable to get fever prediction",
    });
  }
});


// SERVE REACT FRONTEND
const frontendPath = path.join(__dirname, "..", "dist");

app.use(express.static(frontendPath));

app.get("/{*splat}", (req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return next();
  }

  res.sendFile(path.join(frontendPath, "index.html"));
});


const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});