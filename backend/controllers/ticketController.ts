import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
// import { User } from "../models/userModel";
// import { Ticket } from "../models/ticketModel";
// import { Types } from "mongoose";

// @desc Get user tickets
// @route GET /api/tickets
// @access Private
export const getTickets: RequestHandler = asyncHandler(
  async (_req, res, _next) => {
    res.status(200).json({ message: "getTickets" });
  }
);

// @desc Create new ticket
// @route POST /api/tickets
// @access Private
export const createTicket: RequestHandler = asyncHandler(
  async (_req, res, _next) => {
    res.status(200).json({ message: "createTicket" });
  }
);
