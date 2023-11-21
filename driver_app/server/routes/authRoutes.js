import { Router } from "express";

import protect from "../helpers/protect.js";
import { logIn, signUp, logOut } from "../controllers/authControllers.js";

const router = Router();

router.route("/login").post(logIn);
router.route("/signup").post(signUp);
router.route("/logout").post(protect, logOut);

export default router;
