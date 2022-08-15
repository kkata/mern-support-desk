import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";
import { Types } from "mongoose";

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
        token: generateToken(user._id),
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
  async (req, res, _next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // Check user and password match
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid credentials");
    }
  }
);

// @desc Get current user
// @route POST /api/users/me
// @access Private
export const getMe: RequestHandler = asyncHandler(async (req, res, _next) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  };

  res.status(200).json(user);
});

const generateToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
};
