import catchAsync from "../helpers/catchAsync.js";
import sendRequest from "./../helpers/sendRequestToOrgAPI.js";
import APIError from "./../helpers/APIError.js";
import pool from "./../db.js";
import sendEmail from "../helpers/sendEmail.js";

export const singleParcelInfo = catchAsync(async (req, res, next) => {
    const { parcel_id } = req.params;

    let loggedDriverAccepted = false;

    const parcelDriver = await pool.query(
        "SELECT * FROM driver_parcels WHERE parcel_id = $1",
        [parcel_id],
    );

    if (parcelDriver.rowCount !== 0) {
        if (parcelDriver.rows[0].driver_id === req.driver.driver_id) {
            loggedDriverAccepted = true;
        } else if (parcelDriver.rows[0].driver_id !== req.driver.driver_id) {
            return next(
                new APIError("You are not allowed to this parcel info.", 403),
            );
        } else if (parcelDriver.rows[0].delivered === true) {
            return next(
                new APIError("Parcel you're looking for is delivered.", 403),
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
        res.status(201).json({ status: "success" });
    } catch (error) {
        try {
            await client.query("ROLLBACK");
        } catch (rollbackError) {
            console.error("Parcel assing rollback failed: ", rollbackError);
        }

        headers["x-disassign"] = !disassign;

        const disAssignResponse = await sendRequest(
            "PATCH",
            `/parcels/${parcel_id}`,
            headers,
        );

        const disAssignResJSON = await disAssignResponse.json();
        await sendEmail(
            req.driver.driver_email,
            "Parcel disassigned due to server error",
            assignResJSON.data.parcel_info,
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

        client.release();
        return next(
            new APIError("Couldn't assign parcel, try again later.", 500),
        );
    }
});
