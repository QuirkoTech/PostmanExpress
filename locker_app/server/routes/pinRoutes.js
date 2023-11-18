import { Router } from "express";

import {
    pasteDeliveryPin,
    pastePickupPin,
    checkPinLength,
} from "../controllers/pinControllers.js";

const router = Router();

router.route("/pickup").post(checkPinLength, pastePickupPin);
router.route("/deliver").post(checkPinLength, pasteDeliveryPin);

export default router;
