import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { User } from "../models/userModel";
import { Ticket } from "../models/ticketModel";
// import { Types } from "mongoose";

// @desc Get user tickets
// @route GET /api/tickets
// @access Private
export const getTickets: RequestHandler = asyncHandler(
  async (req, res, _next) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const tickets = await Ticket.find({ user: user._id });

    res.status(200).json(tickets);
  }
);

// @desc Create new ticket
// @route POST /api/tickets
// @access Private
export const createTicket: RequestHandler = asyncHandler(
  async (req, res, _next) => {
    const { product, description } = req.body;

    if (!product || !description) {
      res.status(400);
      throw new Error("Product and description are required");
    }

    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const ticket = await Ticket.create({
      product,
      description,
      user: user._id,
      status: "new",
    });

    res.status(200).json(ticket);
  }
);
