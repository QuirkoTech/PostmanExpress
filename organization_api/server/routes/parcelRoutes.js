import { Router } from "express";

const router = Router();

router.route("/:parcel_id").get(singleParcelInfo);

export default router;
