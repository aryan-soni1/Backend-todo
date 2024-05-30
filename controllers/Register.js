// Import necessary modules
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Adjust the path as necessary
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Register route
exports.Register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validate the input fields
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    //pasword check
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "password does not match" });
    }

    // Hash the password

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Respond with the newly created user (excluding the password fields)
    res
      .status(201)
      .json({
        message: "User registered successfully",
        user: { name: newUser.name, email: newUser.email },
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//login controller
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate the input fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the token as a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development" ? "false" : "true",
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
    });

    // Respond with a success message
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Exporting the logout function
exports.logout = async (req, res) => {
  try {
    // Clear the token from cookies by setting it to an empty string and setting expiration to a past date
    res.cookie("token", "", {
      expires: new Date(0),
    
      secure: process.env.NODE_ENV === "development" ? "false" : "true",
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
    });

    // Respond with a success message
    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    // Log any errors
    console.error("Error during logout:", error);

    // Respond with an error message
    return res.status(500).json({
      success: false,
      message: "An error occurred while logging out",
    });
  }
};
