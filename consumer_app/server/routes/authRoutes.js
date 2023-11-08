import { Router } from "express";
import { signUp } from "../controllers/authControllers.js";

const router = Router();

router.route("/signup").post(signUp);
router.route("/login").post();

export default router;
