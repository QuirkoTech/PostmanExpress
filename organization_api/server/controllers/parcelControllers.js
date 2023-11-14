import catchAsync from "../helpers/catchAsync.js";
import pool from "../db.js";

export const newParcel = catchAsync(async (req, res, next) => {
    const {
        package_name,
        recipient_email,
        weight,
        height,
        width,
        length,
        status = "awaiting drop-off",
    } = req.body;

    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        await client.query(
            "INSERT INTO parcels (parcel_status, parcel_sender_id, parcel_receiver_email, height, length, width, weight, pickup_pin, delivery_pin, status_timestamps) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
            [
                status,
                req.user.user_id,
                recipient_email,
                height,
                length,
                width,
                weight,
            ],
        );

        await client.query("COMMIT");
        client.release();
    } catch (error) {
        try {
            await client.query("ROLLBACK");
        } catch (rollbackError) {
            console.error("Parcel creation rollback failed: ", rollbackError);
        }

        client.release();
        return next(
            new APIError("Couldn't create new parcel, try again later.", 500),
        );
    }

    res.status(201).json({ status: "success" });
});
