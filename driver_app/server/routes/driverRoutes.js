import { Router } from "express";

import protect from "../helpers/protect.js";
import { driverLoad, driverParcels } from "../controllers/driverControllers.js";

const router = Router();

router.route("/").get(protect, driverLoad);
router.route("/parcels").get(protect, driverParcels);

export default router;
