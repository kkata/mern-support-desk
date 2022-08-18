import { Router } from "express";
const router = Router();
import { getTickets, createTicket } from "../controllers/ticketController";

import { protect } from "../middleware/authMiddleware";

router.route("/").get(protect, getTickets).post(protect, createTicket);

export const ticketRouter = router;
