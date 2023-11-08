import { Router } from "express";

import {
    consumerSignup,
    consumerLogin,
    consumerLoad,
} from "../controllers/consumerControllers.js";

const router = Router();

router.route("/signup").post(consumerSignup);
router.route("/login").post(consumerLogin);
router.route("/me").get(protect, consumerLoad);

export default router;
