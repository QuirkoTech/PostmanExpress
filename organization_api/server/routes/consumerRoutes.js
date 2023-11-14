import { Router } from "express";

import protect from "../helpers/protect.js";
import refresh from "../helpers/refresh.js";
import {
    consumerSignup,
    consumerLogin,
    consumerLoad,
    userParcels,
} from "../controllers/consumerControllers.js";

const router = Router();

router.route("/signup").post(consumerSignup);
router.route("/login").post(consumerLogin);
router.route("/me").get(protect, refresh, consumerLoad);
router.route("/me/parcels").get(protect, refresh, userParcels);

export default router;
