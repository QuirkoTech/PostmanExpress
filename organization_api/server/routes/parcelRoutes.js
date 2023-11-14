import { Router } from "express";
import protect from "./../helpers/protect.js";

const router = Router();

router.route("/new").post(protect);

export default router;
