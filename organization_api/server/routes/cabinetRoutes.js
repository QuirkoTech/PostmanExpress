import { Router } from "express";

import {
    pasteDeliveryPin,
    pastePickupPin,
} from "./../controllers/cabinetControllers.js";

const router = Router();

router.route("/deliver").post(pasteDeliveryPin);
router.route("/pickup").post(pastePickupPin);

export default router;
