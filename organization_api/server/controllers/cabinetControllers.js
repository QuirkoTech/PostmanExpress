import catchAsync from "./../helpers/catchAsync.js";
import APIError from "../helpers/APIError.js";
import sendEmail from "../helpers/sendEmail.js";
import pool from "./../db.js";

export const pastePickupPin = catchAsync(async (req, res, next) => {
    const { pin, cabinet_location } = req.body;

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const parcel = await client.query(
            "SELECT current_location, parcel_id, parcel_sender_id, parcel_receiver_email FROM parcels WHERE pickup_pin = $1",
            [pin],
        );

        if (parcel.rowCount === 0)
            return next(new APIError("No parcle found with this pin.", 404));

        if (parcel.rows[0].current_location !== cabinet_location)
            return next(
                new APIError(
                    `You are in wrong location, parcel is in ${
                        parcel.rows[0].current_location
                            .charAt(0)
                            .toUpperCase() +
                        parcel.rows[0].current_location.slice(1)
                    }`,
                    400,
                ),
            );

        await client.query("COMMIT");
        client.release();
        res.status(201).json({ status: "success" });
    } catch (error) {
        try {
            await client.query("ROLLBACK");
        } catch (rollbackError) {
            console.error("Pick up pin paste rollback failed: ", rollbackError);
        }

        console.error(error);
        client.release();
        return next(
            new APIError(
                "Couldn't perform pick up pin paste, try again later.",
                500,
            ),
        );
    }
});

export const pasteDeliveryPin = catchAsync(async (req, res, next) => {
    const { pin, cabinet_location } = req.body;

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        await client.query("COMMIT");
        client.release();
        res.status(201).json({ status: "success" });
    } catch (error) {
        try {
            await client.query("ROLLBACK");
        } catch (rollbackError) {
            console.error(
                "Delivery pin paste rollback failed: ",
                rollbackError,
            );
        }

        console.error(error);
        client.release();
        return next(
            new APIError(
                "Couldn't perform delivery pin paste, try again later.",
                500,
            ),
        );
    }
});
