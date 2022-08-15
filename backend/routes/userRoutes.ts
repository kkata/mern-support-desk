import { Router } from "express";
const router = Router();
import { registerUser, loginUser, getMe } from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

export default router;
