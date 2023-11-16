import { Router } from "express";
import protect from "./../helpers/protect.js";
import refresh from "./../helpers/refresh.js";
import { newParcel } from "../controllers/parcelControllers.js";

const router = Router();

router.route("/new").post(protect, refresh, newParcel);
router.route("/:parcel_id").get(singleParcelInfo);

export default router;
