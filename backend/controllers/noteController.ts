import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { User } from "../models/userModel";
import { Note } from "../models/noteModel";
import { Ticket } from "../models/ticketModel";

// @desc Get notes for a ticket
// @route GET /api/tickets/:ticketId/notes
// @access Private
export const getNotes: RequestHandler = asyncHandler(
  async (req, res, _next) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const ticket = await Ticket.findById(req.params.ticketId);

    if (!ticket) {
      res.status(404);
      throw new Error("Ticket not found");
    }

    if (String(ticket.user) !== req.user.id) {
      //              ^^^^^toString: {}; ????
      res.status(401);
      throw new Error("Unauthorized");
    }

    const notes = await Note.find({ ticket: req.params.ticketId });

    res.status(200).json(notes);
  }
);

// @desc Create ticket note
// @route POST /api/tickets/:ticketId/notes
// @access Private
export const addNote: RequestHandler = asyncHandler(async (req, res, _next) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (String(ticket.user) !== req.user.id) {
    //              ^^^^^toString: {}; ????
    res.status(401);
    throw new Error("Unauthorized");
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id,
  });

  res.status(200).json(note);
});
