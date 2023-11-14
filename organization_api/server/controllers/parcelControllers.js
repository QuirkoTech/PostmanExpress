import catchAsync from "../helpers/catchAsync.js";
import pool from "../db.js";
import APIError from "../../../consumer_app/server/helpers/APIError.js";

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

    let pickup_pin = null;
    let delivery_pin = null;

    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        if (status === "awaiting drop-off") delivery_pin = 12345;

        await client.query(
            "INSERT INTO parcels (parcel_status, parcel_sender_id, parcel_receiver_email, height, length, width, weight, pickup_pin, delivery_pin, status_timestamps, notify) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, ARRAY[jsonb_build_object('date', TO_CHAR( now(), 'DD.MM.YY'), 'time', TO_CHAR(now(), 'HH24:MI'), 'status', 'awaiting drop-off')], $10)",
            [
                status,
                req.user.user_id,
                recipient_email,
                height,
                length,
                width,
                weight,
                pickup_pin,
                delivery_pin,
                false,
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

        console.log(error);

        client.release();
        return next(
            new APIError("Couldn't create new parcel, try again later.", 500),
        );
    }

    res.status(201).json({ status: "success" });
});
