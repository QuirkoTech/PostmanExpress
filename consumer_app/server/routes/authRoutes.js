import { Router } from "express";
import { signUp, logIn } from "../controllers/authControllers.js";

const router = Router();

router.route("/signup").post(signUp);
router.route("/login").post(logIn);

export default router;
