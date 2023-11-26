import catchAsync from "../helpers/catchAsync.js";
import sendRequest from "./../helpers/sendRequestToOrgAPI.js";
import APIError from "./../helpers/APIError.js";
import pool from "./../db.js";
import sendEmail from "../helpers/sendEmail.js";

export const singleParcelInfo = catchAsync(async (req, res, next) => {
    const { parcel_id } = req.params;

    let loggedDriverAccepted = false;

    const parcelDriver = await pool.query(
        "SELECT * FROM driver_parcels WHERE parcel_id = $1 AND delivered = false",
        [parcel_id],
    );

    if (parcelDriver.rowCount !== 0) {
        const isDriverInParcels = parcelDriver.rows.some(
            (parcel) => parcel.driver_id === req.driver.driver_id,
        );
        if (isDriverInParcels) {
            loggedDriverAccepted = true;
        } else if (!isDriverInParcels) {
            return next(
                new APIError(
                    "You are not allowed to this parcel info (driver).",
                    403,
                ),
            );
        }
    }

    let headers = {
        "x-driver-location": req.driver.driver_location,
        "x-driver-accepted": loggedDriverAccepted,
    };

    const response = await sendRequest("GET", `/parcels/${parcel_id}`, headers);

    const resJSON = await response.json();

    if (!response.ok)
        return next(new APIError(resJSON.message, response.status));

    res.status(response.status).json(resJSON);
});

export const driverAcceptParcelSwitch = catchAsync(async (req, res, next) => {
    const { parcel_id } = req.params;
    let loggedDriverAccepted = false;
    let disassign = false;

    const parcelDriver = await pool.query(
        "SELECT * FROM driver_parcels WHERE parcel_id = $1",
        [parcel_id],
    );

    if (
        parcelDriver.rowCount !== 0 &&
        parcelDriver.rows[0].driver_id === req.driver.driver_id
    ) {
        loggedDriverAccepted = true;
    }

    let headers = {
        "x-driver-location": req.driver.driver_location,
        "x-driver-accepted": loggedDriverAccepted,
        "x-disassign": disassign,
    };

    const assignResponse = await sendRequest(
        "PATCH",
        `/parcels/${parcel_id}`,
        headers,
    );

    const assignResJSON = await assignResponse.json();

    if (!assignResponse.ok) {
        return next(new APIError(assignResJSON.message, assignResponse.status));
    }

    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        await client.query(
            "INSERT INTO driver_parcels (driver_id, parcel_id) VALUES ($1, $2)",
            [req.driver.driver_id, parcel_id],
        );

        await sendEmail(
            req.driver.driver_email,
            "Parcel ready to be collected",
            assignResJSON.data.parcel_info,
            "driver",
            assignResJSON.data.parcel_info.current_location,
        );

        await client.query("COMMIT");
        client.release();
        res.status(201).json({
            status: "success",
            data: {
                pickup_pin: assignResJSON.data.parcel_info.pin,
            },
        });
    } catch (error) {
        try {
            await client.query("ROLLBACK");
        } catch (rollbackError) {
            console.error("Parcel assing rollback failed: ", rollbackError);
        }

        headers["x-disassign"] = !disassign;
        headers["x-driver-accepted"] = !loggedDriverAccepted;

        const disAssignResponse = await sendRequest(
            "PATCH",
            `/parcels/${parcel_id}`,
            headers,
        );

        const disAssignResJSON = await disAssignResponse.json();
        await sendEmail(
            req.driver.driver_email,
            "Parcel disassigned due to server error",
            disAssignResJSON.data.parcel_info,
            "driver",
        );

        if (!disAssignResponse.ok) {
            return next(
                new APIError(
                    disAssignResJSON.message,
                    disAssignResponse.status,
                ),
            );
        }

        console.error(error);
        client.release();
        return next(
            new APIError("Couldn't assign parcel, try again later.", 500),
        );
    }
});

export const driverNotify = catchAsync(async (req, res, next) => {
    const apiKey = req.headers["x-api-key"];
    if (apiKey !== process.env.API_KEY)
        return next(new APIError("Invalid API key to notigy the driver.", 400));

    const driverParcel = await pool.query(
        `
        SELECT dp.id, dp.parcel_id, dp.delivered, d.driver_email
        FROM driver_parcels dp
        JOIN drivers d ON dp.driver_id = d.driver_id
        WHERE dp.parcel_id = $1
    `,
        [req.body.parcel_info.parcel_id],
    );

    if (driverParcel.rowCount === 0)
        return next(
            new APIError(
                `No driver accepted parcel with this ID: ${req.body.parcel_info.parcel_id}.`,
            ),
        );

    const emailSent = await sendEmail(
        driverParcel.rows[0].driver_email,
        req.body.title,
        req.body.parcel_info,
        "driver",
        req.body.parcel_info.ship_to,
    );

    if (!emailSent) return next(new APIError("Couldn't notify driver.", 500));

    res.status(201).json({ status: "success" });
});

export const deliverParcel = catchAsync(async (req, res, next) => {
    const apiKey = req.headers["x-api-key"];
    if (apiKey !== process.env.API_KEY)
        return next(new APIError("Invalid API key to notigy the driver.", 400));

    const { parcel_id } = req.params;

    const client = await pool.connect();

    try {
        const driverParcel = await client.query(
            "SELECT * FROM driver_parcels WHERE parcel_id = $1",
            [parcel_id],
        );

        if (driverParcel.rowCount === 0) {
            await client.query("ROLLBACK");
            client.release();
            return next(
                new APIError(
                    `No driver accepted parcel with this ID: ${parcel_id}.`,
                ),
            );
        }

        await client.query(
            "UPDATE driver_parcels SET delivered = true WHERE parcel_id = $1",
            [parcel_id],
        );

        res.status(200).json({ status: "success" });
    } catch (error) {
        try {
            await client.query("ROLLBACK");
        } catch (rollbackError) {
            console.error("Delivery rollback failed: ", rollbackError);
        }

        console.error(error);
        client.release();
        return next(
            new APIError("Couldn't perform delivery, try again later.", 500),
        );
    }
});

export const getAvailableParcels = catchAsync(async (req, res, next) => {
    let headers = {
        "x-driver-location": req.driver.driver_location,
    };

    const response = await sendRequest("GET", `/parcels`, headers);

    const resJSON = await response.json();

    if (!response.ok)
        return next(new APIError(resJSON.message, response.status));

    res.status(response.status).json(resJSON);
});
