import { Router } from "express";
import { newParcel } from "../controllers/parcelControllers.js";
import protect from "../helpers/protect.js";

const router = Router();

router.route("/new").post(protect, newParcel);

export default router;
