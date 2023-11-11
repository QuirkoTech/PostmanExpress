import { Router } from "express";
import { userLoad } from "../controllers/userControllers.js";
import protect from "../helpers/protect.js";

const router = Router();

router.route("/").get(protect, userLoad);
router.route("/delete").delete();

export default router;
userLoad;
