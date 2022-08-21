import { Router } from "express";
const router = Router();
import {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController";

import { protect } from "../middleware/authMiddleware";

// Re-route into note router
import { noteRouter } from "./noteRoutes";
router.use("/:ticketId/notes", noteRouter);

router.route("/").get(protect, getTickets).post(protect, createTicket);

router
  .route("/:id")
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);

export const ticketRouter = router;
