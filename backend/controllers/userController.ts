import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { User } from "../models/userModel";

// @desc Register a new user
// @route POST /api/users
// @access Public
export const registerUser: RequestHandler = asyncHandler(
  async (req, res, _next) => {
    const { name, email, password } = req.body;

    // Validations
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please enter all fields");
    }

    // Find if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
);

// @desc Login a new user
// @route POST /api/users/login
// @access Public
export const loginUser: RequestHandler = asyncHandler(
  async (_req, res, _next) => {
    res.send("Login Route");
  }
);
