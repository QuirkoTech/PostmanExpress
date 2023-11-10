import { Router } from "express";

// import protect from "../helpers/protect.js";
import { logIn } from "../controllers/authControllers.js";

const router = Router();

router.route("/login").post(logIn);
// router.route("/me").get(protect, consumerLoad);

export default router;
