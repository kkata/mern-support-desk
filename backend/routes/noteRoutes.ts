import { Router } from "express";
const router = Router({ mergeParams: true });
import { getNotes, addNote } from "../controllers/noteController";

import { protect } from "../middleware/authMiddleware";

router.route("/").get(protect, getNotes).post(protect, addNote);

export const noteRouter = router;
