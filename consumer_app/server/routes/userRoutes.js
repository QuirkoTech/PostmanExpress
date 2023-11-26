import { Router } from "express";
import {
    userLoad,
    userParcels,
    userParcelsHistory,
    deleteUser,
} from "../controllers/userControllers.js";
import protect from "../helpers/protect.js";
import { defaultLimiter } from "../helpers/limiters.js";

const router = Router();

router
    .route("/")
    .get(defaultLimiter, protect, userLoad)
    .delete(defaultLimiter, protect, deleteUser);
router.route("/parcels").get(defaultLimiter, protect, userParcels);
router.route("/history").get(defaultLimiter, protect, userParcelsHistory);

export default router;
