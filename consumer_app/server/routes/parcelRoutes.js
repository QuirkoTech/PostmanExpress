import { Router } from "express";
import {
    newParcel,
    singleParcelInfo,
} from "../controllers/parcelControllers.js";
import protect from "../helpers/protect.js";
import { defaultLimiter } from "../helpers/limiters.js";

const router = Router();

router.route("/new").post(defaultLimiter, protect, newParcel);
router.route("/:parcel_id").get(defaultLimiter, singleParcelInfo);

export default router;
