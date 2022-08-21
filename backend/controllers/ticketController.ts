import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { User } from "../models/userModel";
import { Ticket } from "../models/ticketModel";

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

// @desc Get user tickets
// @route GET /api/tickets/:id
// @access Private
export const getTicket: RequestHandler = asyncHandler(
  async (req, res, _next) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      res.status(404);
      throw new Error("Ticket not found");
    }

    if (String(ticket.user!) !== user._id.toString()) {
      //              ^^^^^toString: {}; ????
      res.status(401);
      throw new Error("Unauthorized");
    }

    res.status(200).json(ticket);
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

// @desc Delete user tickets
// @route DELETE /api/tickets/:id
// @access Private
export const deleteTicket: RequestHandler = asyncHandler(
  async (req, res, _next) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      res.status(404);
      throw new Error("Ticket not found");
    }

    if (String(ticket.user!) !== user._id.toString()) {
      //              ^^^^^toString: {}; ????
      res.status(401);
      throw new Error("Unauthorized");
    }

    await ticket.remove();

    res.status(200).json({ success: true });
  }
);

// @desc Update user tickets
// @route PUT /api/tickets/:id
// @access Private
export const updateTicket: RequestHandler = asyncHandler(
  async (req, res, _next) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      res.status(404);
      throw new Error("Ticket not found");
    }

    if (String(ticket.user!) !== user._id.toString()) {
      //              ^^^^^toString: {}; ????
      res.status(401);
      throw new Error("Unauthorized");
    }

    const updateTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updateTicket);
  }
);
