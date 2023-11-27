import { Router } from "express";
import { signUp, logIn, logOut } from "../controllers/authControllers.js";
import protect from "../helpers/protect.js";
import { defaultLimiter } from "../helpers/limiters.js";

const router = Router();

router.route("/signup").post(defaultLimiter, signUp);
router.route("/login").post(defaultLimiter, logIn);
router.route("/logout").post(defaultLimiter, protect, logOut);

export default router;
