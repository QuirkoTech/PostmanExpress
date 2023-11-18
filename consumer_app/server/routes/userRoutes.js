import { Router } from "express";
import {
    userLoad,
    userParcels,
    deletedUser,
} from "../controllers/userControllers.js";
import protect from "../helpers/protect.js";

const router = Router();

router.route("/").get(protect, userLoad).delete(protect, deletedUser);
router.route("/parcels").get(protect, userParcels);

export default router;
