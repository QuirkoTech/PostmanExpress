import { Router } from "express";
import { userLoad, userParcels } from "../controllers/userControllers.js";
import protect from "../helpers/protect.js";

const router = Router();

router.route("/").get(protect, userLoad);
router.route("/parcels").get(protect, userParcels);
router.route("/delete").delete();

export default router;
