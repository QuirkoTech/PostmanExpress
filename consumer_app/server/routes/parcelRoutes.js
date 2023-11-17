import { Router } from "express";
import {
    newParcel,
    singleParcelInfo,
} from "../controllers/parcelControllers.js";
import protect from "../helpers/protect.js";

const router = Router();

router.route("/new").post(protect, newParcel);
router.route("/:parcel_id").get(singleParcelInfo);

export default router;
