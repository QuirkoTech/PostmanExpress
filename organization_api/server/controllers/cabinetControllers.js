import catchAsync from "./../helpers/catchAsync.js";
import APIError from "../helpers/APIError.js";
import sendEmail from "../helpers/sendEmail.js";
import pool from "./../db.js";
import generateUniquePin from "../helpers/generateUniquePin.js";
import fetch from "node-fetch";

export const pastePickupPin = catchAsync(async (req, res, next) => {
    const { pin, cabinet_location } = req.body;

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const parcel = await client.query(
            "SELECT current_location, parcel_id, parcel_receiver_email, ship_to, parcel_status FROM parcels WHERE pickup_pin = $1",
            [pin],
        );

        if (parcel.rowCount === 0)
            return next(new APIError("No parcel found with this pickup pin.", 404));

        const parcelObj = parcel.rows[0];

        if (parcelObj.current_location !== cabinet_location)
            return next(
                new APIError(
                    `You are in the wrong location. The parcel is available for pickup in ${
                        parcelObj.current_location.charAt(0).toUpperCase() +
                        parcelObj.current_location.slice(1)
                    }`,
                    400,
                ),
            );

        await client.query(
            "WITH selected_cabinet AS \
             (SELECT \
                cabinet_id FROM cabinets \
                WHERE \
                parcel_id = $1 \
                ) \
             UPDATE \
             cabinets \
                SET \
                cabinet_status = 'empty',\
                parcel_id = null \
                FROM selected_cabinet \
                WHERE \
                cabinets.cabinet_id = selected_cabinet.cabinet_id",
            [parcelObj.parcel_id],
        );

        if (parcelObj.current_location === parcelObj.ship_to) {
            const updatedParcel = await client.query(
                `UPDATE parcels
            SET 
                status_timestamps = status_timestamps || jsonb_build_object('date', TO_CHAR( now(), 'DD.MM.YY'), 'time', TO_CHAR(now(), 'HH24:MI'), 'status', 'delivered'),
                parcel_status = 'delivered',
                current_location = null,
                pickup_pin = null,
                delivery_pin = null,
                notify = true
            WHERE parcel_id = $1
            RETURNING parcel_id, ship_from, ship_to, parcel_name, parcel_receiver_email;`,
                [parcelObj.parcel_id],
            );

            const emailSent = await sendEmail(
                updatedParcel.rows[0].parcel_receiver_email,
                "Parcel delivered",
                updatedParcel.rows[0],
                "consumer",
            );

            if (!emailSent) {
                await client.query("ROLLBACK");
                client.release();
                return next(new APIError("Couldn't pick up the parcel.", 500));
            }
        } else {
            let parcelShipTo = parcelObj.ship_to;
            if (parcelObj.current_location !== "warehouse")
                parcelShipTo = "warehouse";

            const delivery_pin = await generateUniquePin("delivery");

            let parcelStatus = "en route to the pickup location";
            if (parcelObj.parcel_status === "prepared for delivery")
                parcelStatus = "en route to the warehouse";

            let updatedParcel = await client.query(
                `UPDATE parcels
                SET 
                    status_timestamps = status_timestamps || jsonb_build_object('date', TO_CHAR( now(), 'DD.MM.YY'), 'time', TO_CHAR(now(), 'HH24:MI'), 'status', $1::parcelstatus),
                    parcel_status = $1::parcelstatus,
                    current_location = null,
                    pickup_pin = null,
                    delivery_pin = $2
                WHERE parcel_id = $3
                RETURNING parcel_id, ship_from, ship_to, delivery_pin AS pin;`,
                [parcelStatus, delivery_pin, parcelObj.parcel_id],
            );

            updatedParcel.rows[0].ship_to = parcelShipTo;

            const response = await fetch(
                `${process.env.DRIVER_API_URL}/parcels/notify`,
                {
                    method: "PATCH",
                    body: JSON.stringify({
                        parcel_info: updatedParcel.rows[0],
                        title: "Parcel awaiting drop-off",
                    }),
                    headers: {
                        "Content-type": "application/json",
                        "x-api-key": process.env.API_KEY,
                    },
                },
            );

            if (!response.ok) {
                await client.query("ROLLBACK");
                client.release();
                return next(new APIError("Couldn't pick up the parcel.", 500));
            }
        }

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

        const parcel = await client.query(
            "SELECT current_location, parcel_id, ship_to, ship_from, parcel_status, parcel_receiver_email FROM parcels WHERE delivery_pin = $1",
            [pin],
        );

        if (parcel.rowCount === 0)
            return next(new APIError("No parcel found with this delivery pin.", 404));

        const parcelObj = parcel.rows[0];

        if (
            parcelObj.parcel_status === "awaiting drop-off" &&
            parcelObj.ship_from !== cabinet_location
        )
            return next(
                new APIError(
                    `You are in the wrong location. Please deliver the parcel to ${
                        parcelObj.ship_from.charAt(0).toUpperCase() +
                        parcelObj.ship_from.slice(1)
                    }`,
                    400,
                ),
            );
        if (
            parcelObj.parcel_status === "en route to the warehouse" &&
            cabinet_location !== "warehouse"
        )
            return next(
                new APIError(
                    `You are in the wrong location. Please deliver the parcel to the Warehouse`,
                    400,
                ),
            );
        if (
            parcelObj.parcel_status === "en route to the pickup location" &&
            parcelObj.ship_to !== cabinet_location
        )
            return next(
                new APIError(
                    `You are in the wrong location. Please deliver the parcel to ${
                        parcelObj.ship_to.charAt(0).toUpperCase() +
                        parcelObj.ship_to.slice(1)
                    }`,
                    400,
                ),
            );

        await client.query(
            "WITH selected_cabinet AS \
             (SELECT \
                cabinet_id FROM cabinets \
                WHERE \
                cabinet_status = 'reserved' AND cabinet_location = $1 \
                LIMIT 1 ) \
             UPDATE \
             cabinets \
                SET \
                cabinet_status = 'occupied',\
                parcel_id = $2 \
                FROM selected_cabinet \
                WHERE \
                cabinets.cabinet_id = selected_cabinet.cabinet_id",
            [cabinet_location, parcelObj.parcel_id],
        );

        if (cabinet_location === parcelObj.ship_from) {
            await client.query(
                `UPDATE 
                    parcels 
                SET
                    status_timestamps = status_timestamps || jsonb_build_object('date', TO_CHAR( now(), 'DD.MM.YY'), 'time', TO_CHAR(now(), 'HH24:MI'), 'status', 'prepared for delivery'),
                    parcel_status = 'prepared for delivery',
                    current_location = $1,
                    delivery_pin = null
                WHERE
                    parcel_id = $2`,
                [cabinet_location, parcelObj.parcel_id],
            );
        } else if (
            cabinet_location === parcelObj.ship_to ||
            cabinet_location === "warehouse"
        ) {
            if (cabinet_location === parcelObj.ship_to) {
                const pickup_pin = await generateUniquePin("pickup");

                const updatedParcel = await client.query(
                    `UPDATE 
                            parcels 
                        SET
                            status_timestamps = status_timestamps || jsonb_build_object('date', TO_CHAR( now(), 'DD.MM.YY'), 'time', TO_CHAR(now(), 'HH24:MI'), 'status', 'ready for pickup'),
                            parcel_status = 'ready for pickup',
                            current_location = $1,
                            delivery_pin = null,
                            pickup_pin = $2,
                            driver_accepted = false
                        WHERE
                            parcel_id = $3
                        RETURNING
                            parcel_id,
                            ship_from,
                            ship_to,
                            parcel_name,
                            pickup_pin AS pin`,
                    [cabinet_location, pickup_pin, parcelObj.parcel_id],
                );

                const emailSent = await sendEmail(
                    parcelObj.parcel_receiver_email,
                    "Parcel ready to be collected",
                    updatedParcel.rows[0],
                    "consumer",
                    cabinet_location,
                );

                if (!emailSent) {
                    await client.query("ROLLBACK");
                    client.release();
                    return next(
                        new APIError("Couldn't deliver the parcel.", 500),
                    );
                }
            } else if (cabinet_location === "warehouse") {
                await client.query(
                    `UPDATE 
                        parcels 
                    SET
                        status_timestamps = status_timestamps || jsonb_build_object('date', TO_CHAR( now(), 'DD.MM.YY'), 'time', TO_CHAR(now(), 'HH24:MI'), 'status', 'at warehouse'),
                        parcel_status = 'at warehouse',
                        current_location = $1,
                        delivery_pin = null,
                        driver_accepted = false
                    WHERE
                        parcel_id = $2
                    RETURNING
                        parcel_id,
                        ship_from,
                        ship_to`,
                    [cabinet_location, parcelObj.parcel_id],
                );
            }

            const response = await fetch(
                `${process.env.DRIVER_API_URL}/parcels/${parcelObj.parcel_id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json",
                        "x-api-key": process.env.API_KEY,
                    },
                },
            );

            if (!response.ok) {
                await client.query("ROLLBACK");
                client.release();
                return next(new APIError("Couldn't deliver the parcel.", 500));
            }
        } else {
            await client.query("ROLLBACK");
            client.release();
            return next(
                new APIError("Seems like you are in the wrong location.", 400),
            );
        }

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
