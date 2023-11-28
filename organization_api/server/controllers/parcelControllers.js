import catchAsync from "../helpers/catchAsync.js";
import pool from "../db.js";
import APIError from "../../../consumer_app/server/helpers/APIError.js";
import sendEmail from "../helpers/sendEmail.js";
import checkFreeCabinets from "../helpers/checkFreeCabinets.js";
import { v4 } from "uuid";
import generateUniquePin from "../helpers/generateUniquePin.js";
import jwt from "jsonwebtoken";
import compareDriverAndParcelLocations from "../helpers/compareDriverAndParcelLocations.js";

export const newParcel = catchAsync(async (req, res, next) => {
    const {
        parcel_name,
        recipient_email,
        weight,
        height,
        width,
        length,
        ship_to,
        ship_from,
    } = req.body;

    if (ship_from === ship_to)
        return next(
            new APIError("You can't send parcels to the same location.", 400),
        );

    let status = "awaiting drop-off";

    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        const freeCabinets = await checkFreeCabinets(req.user.user_location);

        if (!freeCabinets) {
            await client.query("ROLLBACK");
            client.release();

            return next(
                new APIError("No available cabinets at the moment.", 404),
            );
        }

        const delivery_pin = await generateUniquePin("delivery");
        const parcel_id = v4();

        await client.query(
            "INSERT INTO parcels (ship_from, ship_to, parcel_id, parcel_name, parcel_status, parcel_sender_id, parcel_receiver_email, height, length, width, weight, delivery_pin, status_timestamps, notify) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, ARRAY[jsonb_build_object('date', TO_CHAR( now(), 'DD.MM.YY'), 'time', TO_CHAR(now(), 'HH24:MI'), 'status', 'awaiting drop-off')], $13) RETURNING *",
            [
                ship_from,
                ship_to,
                parcel_id,
                parcel_name,
                status,
                req.user.user_id,
                recipient_email,
                height,
                length,
                width,
                weight,
                delivery_pin,
                false,
            ],
        );

        await client.query(
            "WITH selected_cabinet AS \
             (SELECT \
                cabinet_id FROM cabinets \
                WHERE \
                cabinet_location = $1 AND cabinet_status = 'empty' \
                LIMIT 1 ) \
             UPDATE \
             cabinets \
                SET \
                cabinet_status = 'reserved' \
                FROM selected_cabinet \
                WHERE \
                cabinets.cabinet_id = selected_cabinet.cabinet_id",
            [req.user.user_location],
        );

        const emailSent = await sendEmail(
            req.user.user_email,
            "Parcel awaiting drop-off",
            { ...req.body, parcel_id, pin: delivery_pin },
            "consumer",
            ship_from,
        );

        if (!emailSent) {
            await client.query("ROLLBACK");
            client.release();
            return next(new APIError("Couldn't send an email.", 500));
        }

        await client.query("COMMIT");
        client.release();
        res.status(201).json({
            status: "success",
            data: {
                message:
                    "Parcel created. Check your email for further instructions.",
                delivery_pin,
            },
        });
    } catch (error) {
        try {
            await client.query("ROLLBACK");
        } catch (rollbackError) {
            console.error("Parcel creation rollback failed: ", rollbackError);
        }

        console.error(error);
        client.release();
        return next(
            new APIError("Couldn't create new parcel, try again later.", 500),
        );
    }
});

export const singleParcelInfo = catchAsync(async (req, res, next) => {
    const { parcel_id } = req.params;

    const parcel = await pool.query(
        "SELECT current_location, ship_to, ship_from, parcel_sender_id, parcel_receiver_email FROM parcels WHERE parcel_id = $1",
        [parcel_id],
    );

    if (parcel.rowCount === 0)
        return next(new APIError("No parcel found.", 404));

    const parcelObj = parcel.rows[0];

    let accessToken = null;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        accessToken = req.headers.authorization.split(" ")[1];
    }

    const appType = req.headers["x-application-type"];

    if (
        appType === process.env.DRIVER_APP_HEADER &&
        (!req.headers["x-driver-location"] || !req.headers["x-driver-accepted"])
    )
        return next(new APIError("Invalid driver application headers.", 400));

    let parcelSearchQuery = "";

    if (accessToken && appType === process.env.CONSUMER_APP_HEADER) {
        const payload = jwt.decode(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET,
        );

        if (!payload) return next(new APIError("Invalid token.", 401));

        const userId = payload.id;
        if (!userId) return next(new APIError("No user id provided", 400));

        let user;
        user = await pool.query(
            "SELECT user_id, user_name, user_email, refresh_token, user_location FROM users WHERE user_id = $1",
            [userId],
        );

        if (user.rowCount === 0 || user.rows[0].user_email === null)
            return next(new APIError("No user found.", 404));

        jwt.verify(
            user.rows[0].refresh_token,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err)
                    return next(
                        new APIError(
                            "Session expired, please log in again.",
                            401,
                        ),
                    );
            },
        );

        if (
            parcelObj.parcel_sender_id === user.rows[0].user_id ||
            parcelObj.parcel_receiver_email === user.rows[0].user_email
        ) {
            parcelSearchQuery = `
                                SELECT 
                                    p.parcel_id,
                                    COALESCE(sender.user_name, p.parcel_sender_id::varchar) AS sender_name,
                                    COALESCE(receiver.user_name, p.parcel_receiver_email) AS receiver_name,
                                    p.parcel_status,
                                    p.status_timestamps,
                                    p.width,
                                    p.height,
                                    p.length,
                                    p.weight,
                                    p.parcel_name,
                                    p.ship_to,
                                    p.ship_from
                                FROM 
                                    parcels p
                                LEFT JOIN 
                                    users sender ON p.parcel_sender_id = sender.user_id
                                LEFT JOIN 
                                    users receiver ON p.parcel_receiver_email = receiver.user_email
                                WHERE 
                                    p.parcel_id = $1;
                            `;
        }
    } else if (
        appType === process.env.DRIVER_APP_HEADER &&
        req.headers["x-driver-location"]
    ) {
        const driverLocation = req.headers["x-driver-location"];
        const loggedDriverAccepted = req.headers["x-driver-accepted"];

        const driverCanGetInfo = compareDriverAndParcelLocations(
            parcelObj.current_location,
            parcelObj.ship_to,
            parcelObj.ship_from,
            driverLocation,
        );

        if (!driverCanGetInfo)
            return next(
                new APIError("You are not allowed to this parcel info.", 400),
            );

        if (loggedDriverAccepted === "true") {
            parcelSearchQuery = `
                                SELECT 
                                    parcel_id,
                                    ship_to,
                                    current_location,
                                    pickup_pin,
                                    delivery_pin, 
                                    length,
                                    height,
                                    width,
                                    weight,
                                    driver_accepted
                                FROM 
                                    parcels
                                WHERE 
                                    parcel_id = $1;
                                `;
        } else if (loggedDriverAccepted === "false") {
            parcelSearchQuery = `
                SELECT 
                    parcel_id,
                    ship_to,
                    current_location,
                    length,
                    height,
                    width,
                    weight,
                    driver_accepted
                FROM 
                    parcels
                WHERE 
                    parcel_id = $1;
                `;
        }
    } else {
        parcelSearchQuery = `
                            SELECT 
                                parcel_id,
                                parcel_status,
                                status_timestamps,
                                ship_to,
                                ship_from
                            FROM 
                                parcels
                            WHERE 
                                parcel_id = $1;
                        `;
    }

    const parcelInfo = await pool.query(parcelSearchQuery, [parcel_id]);

    if (
        appType === process.env.DRIVER_APP_HEADER &&
        req.headers["x-driver-location"] &&
        parcelObj.current_location !== "warehouse"
    ) {
        parcelInfo.rows[0].ship_to = "warehouse";
    }

    let data = { parcel_info: parcelInfo.rows[0] };
    if (
        appType === process.env.CONSUMER_APP_HEADER &&
        parcelSearchQuery ===
            `
    SELECT 
        parcel_id,
        parcel_status,
        status_timestamps,
        ship_to,
        ship_from
    FROM 
        parcels
    WHERE 
        parcel_id = $1;
`
    ) {
        data.authorized = false;
    } else if (appType === process.env.CONSUMER_APP_HEADER) {
        data.authorized = true;
    }
    res.status(200).json({
        status: "success",
        data: data,
    });
});

export const driverAcceptParcelSwitch = catchAsync(async (req, res, next) => {
    const { parcel_id } = req.params;

    const parcel = await pool.query(
        "SELECT current_location, ship_to, ship_from, driver_accepted FROM parcels WHERE parcel_id = $1",
        [parcel_id],
    );

    if (parcel.rowCount === 0)
        return next(new APIError("No parcel found.", 404));

    const driverLocation = req.headers["x-driver-location"];
    const loggedDriverAccepted = req.headers["x-driver-accepted"];
    const parcelDisassign = req.headers["x-disassign"];
    let currentParcelLocation = parcel.rows[0].current_location;
    let shipToParcelLocation = parcel.rows[0].ship_to;
    let shipFromParcelLocation = parcel.rows[0].ship_from;

    if (loggedDriverAccepted !== "true" && loggedDriverAccepted !== "false")
        return next(
            new APIError("Invalid 'driver-accepted' header value.", 400),
        );

    if (parcelDisassign !== "true" && parcelDisassign !== "false")
        return next(new APIError("Invalid 'disassign' header value.", 400));

    const driverCanAcceptParcel = compareDriverAndParcelLocations(
        currentParcelLocation,
        shipToParcelLocation,
        shipFromParcelLocation,
        driverLocation,
    );

    if (!driverCanAcceptParcel)
        return next(
            new APIError("You can't perfom any action with this parcel.", 400),
        );

    const client = await pool.connect();

    if (currentParcelLocation !== "warehouse") {
        shipToParcelLocation = "warehouse";
    }

    try {
        await client.query("BEGIN");

        if (
            parcel.rows[0].driver_accepted &&
            loggedDriverAccepted === "false"
        ) {
            await client.query("ROLLBACK");
            client.release();
            return next(
                new APIError("Parcel accepted by another driver.", 409),
            );
        } else if (
            !parcel.rows[0].driver_accepted &&
            loggedDriverAccepted === "true"
        ) {
            await client.query("ROLLBACK");
            client.release();
            return next(
                new APIError(
                    "Conflict, header 'driver-accepted' is set to true, while parcel is not accepted by any driver.",
                    409,
                ),
            );
        } else if (
            parcel.rows[0].driver_accepted &&
            loggedDriverAccepted === "true"
        ) {
            if (parcelDisassign === "true") {
                await client.query(
                    "WITH selected_cabinet AS \
                (SELECT \
                   cabinet_id FROM cabinets \
                   WHERE \
                   cabinet_location = $1 AND cabinet_status = 'reserved' \
                   LIMIT 1 ) \
                UPDATE \
                cabinets \
                   SET \
                   cabinet_status = 'empty' \
                   FROM selected_cabinet \
                   WHERE \
                   cabinets.cabinet_id = selected_cabinet.cabinet_id",
                    [shipToParcelLocation],
                );

                const updatedParcel = await client.query(
                    "UPDATE parcels SET driver_accepted = false, pickup_pin = null WHERE parcel_id = $1 RETURNING parcel_id, ship_from, ship_to",
                    [parcel_id],
                );

                await client.query("COMMIT");
                client.release();
                res.status(201).json({
                    status: "success",
                    data: {
                        message: "Parcel disassigned.",
                        parcel_info: updatedParcel.rows[0],
                    },
                });
            } else if (parcelDisassign === "false") {
                return next(
                    new APIError(
                        "Invalid 'disassign' header value to disassign the parcel.",
                        400,
                    ),
                );
            }
        } else if (
            !parcel.rows[0].driver_accepted &&
            loggedDriverAccepted === "false"
        ) {
            const freeDestinationLockers = await client.query(
                "SELECT cabinet_id FROM cabinets WHERE cabinet_status = 'empty' AND cabinet_location = $1",
                [shipToParcelLocation],
            );
            if (freeDestinationLockers.rowCount === 0) {
                await client.query("ROLLBACK");
                client.release();
                return next(
                    new APIError(
                        "No free cabinets to deliver the parcel to.",
                        404,
                    ),
                );
            }

            await client.query(
                "WITH selected_cabinet AS \
            (SELECT \
               cabinet_id FROM cabinets \
               WHERE \
               cabinet_location = $1 AND cabinet_status = 'empty' \
               LIMIT 1 ) \
            UPDATE \
            cabinets \
               SET \
               cabinet_status = 'reserved' \
               FROM selected_cabinet \
               WHERE \
               cabinets.cabinet_id = selected_cabinet.cabinet_id",
                [shipToParcelLocation],
            );

            const pickup_pin = await generateUniquePin("pickup");
            const updatedParcel = await client.query(
                "UPDATE parcels SET driver_accepted = true, pickup_pin = $1 WHERE parcel_id = $2 RETURNING parcel_id, ship_from, ship_to, current_location",
                [pickup_pin, parcel_id],
            );

            if (updatedParcel.rows[0].current_location !== "warehouse") {
                updatedParcel.rows[0].ship_to = "warehouse";
            } else {
                updatedParcel.rows[0].ship_from = "warehouse";
            }

            await client.query("COMMIT");
            client.release();
            res.status(201).json({
                status: "success",
                data: {
                    message: "Parcel assigned.",
                    parcel_info: { ...updatedParcel.rows[0], pin: pickup_pin },
                },
            });
        } else {
            return next(new APIError("Something wrong with the request.", 400));
        }
    } catch (error) {
        try {
            await client.query("ROLLBACK");
        } catch (rollbackError) {
            console.error("Parcel assing rollback failed: ", rollbackError);
        }

        console.error(error);
        client.release();
        return next(
            new APIError(
                "Couldn't assign/disassign parcel, try again later.",
                500,
            ),
        );
    }
});

export const driverAvailableParcels = catchAsync(async (req, res, next) => {
    const driverLocation = req.headers["x-driver-location"];

    try {
        const parcels = await pool.query(
            `SELECT 
                (status_timestamps[array_upper(status_timestamps, 1)]->>'date') as last_status_date, 
                parcel_id, 
                CASE 
                    WHEN current_location != 'warehouse' THEN 'warehouse' 
                    ELSE ship_to 
                END as ship_to
            FROM parcels 
            WHERE driver_accepted = false 
            AND (
                (current_location = $1 AND current_location != ship_to) OR 
                (current_location = 'warehouse' AND ship_to = $1)
        );`,
            [driverLocation],
        );

        res.status(200).json({
            status: "success",
            data: { parcels: parcels.rows },
        });
    } catch (error) {
        console.error(error);
        return next(new APIError("Couldn't get available parcels.", 500));
    }
});

export const driverParcels = catchAsync(async (req, res, next) => {
    const { parcel_ids } = req.body;

    try {
        const parcels = await pool.query(
            "SELECT (status_timestamps[array_upper(status_timestamps, 1)]->>'date') as last_status_date, parcel_id, CASE WHEN current_location != 'warehouse' THEN 'warehouse' ELSE ship_to END as ship_to FROM parcels WHERE parcel_id = ANY($1)",
            [parcel_ids],
        );

        res.status(200).json({
            status: "success",
            data: { parcels: parcels.rows },
        });
    } catch (error) {
        console.error(error);
        return next(new APIError("Something went wrong.", 500));
    }
});
