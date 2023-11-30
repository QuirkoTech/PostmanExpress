import { Router } from "express";
import { signUp, logIn, logOut } from "../controllers/authControllers.js";
import protect from "../helpers/protect.js";

const router = Router();

router.route("/signup").post(signUp);
router.route("/login").post(logIn);
router.route("/logout").post(protect, logOut);

export default router;
