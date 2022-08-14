import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";

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

    res.send("Register Route");
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
