import { Router } from "express";

import protect from "../helpers/protect.js";
import {
    singleParcelInfo,
    driverAcceptParcelSwitch,
    driverNotify,
    deliverParcel,
    getAvailableParcels,
} from "../controllers/parcelControllers.js";

const router = Router();

router.route("/").get(protect, getAvailableParcels);
router
    .route("/:parcel_id")
    .get(protect, singleParcelInfo)
    .patch(protect, driverAcceptParcelSwitch)
    .delete(deliverParcel);

router.route("/notify").patch(driverNotify);

export default router;
