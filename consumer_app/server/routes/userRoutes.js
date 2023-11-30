import { Router } from "express";
import {
    userLoad,
    userParcels,
    userParcelsHistory,
    deleteUser,
} from "../controllers/userControllers.js";
import protect from "../helpers/protect.js";

const router = Router();

router.route("/").get(protect, userLoad).delete(protect, deleteUser);
router.route("/parcels").get(protect, userParcels);
router.route("/history").get(protect, userParcelsHistory);

export default router;
