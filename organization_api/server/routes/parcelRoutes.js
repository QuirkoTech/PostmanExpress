import { Router } from "express";
import protect from "./../helpers/protect.js";
import refresh from "./../helpers/refresh.js";
import {
    newParcel,
    singleParcelInfo,
    driverAcceptParcelSwitch,
    driverAvailableParcels,
} from "../controllers/parcelControllers.js";

import { protectDriver } from "../helpers/protectAppFocusedRoutes.js";

const router = Router();

router.route("/").get(protectDriver, driverAvailableParcels);
router.route("/new").post(protect, refresh, newParcel);
router
    .route("/:parcel_id")
    .get(singleParcelInfo)
    .patch(protectDriver, driverAcceptParcelSwitch);

export default router;
