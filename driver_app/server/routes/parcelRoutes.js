import { Router } from "express";

import protect from "../helpers/protect.js";
import { singleParcelInfo } from "../controllers/parcelControllers.js";

const router = Router();

router.route("/:parcel_id").get(protect, singleParcelInfo);

export default router;
