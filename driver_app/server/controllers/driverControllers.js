import APIError from "../helpers/APIError.js";
import catchAsync from "../helpers/catchAsync.js";
import pool from "./../db.js";
import sendRequest from "./../helpers/sendRequestToOrgAPI.js";

// eslint-disable-next-line no-unused-vars
export const driverLoad = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: "success",
        data: { driver_name: req.driver.driver_name },
    });
});

export const driverParcels = catchAsync(async (req, res, next) => {
    const parcelIds = await pool.query(
        "SELECT parcel_id FROM driver_parcels WHERE driver_id = $1 AND delivered = false",
        [req.driver.driver_id],
    );

    const modifiedIds = parcelIds.rows.map((parcelObj) => parcelObj.parcel_id);

    if (modifiedIds.length === 0)
        return res
            .status(200)
            .json({ status: "success", data: { parcels: modifiedIds } });

    const response = await sendRequest(
        "POST",
        "/parcels/driver",
        {},
        { parcel_ids: modifiedIds },
    );

    const resJSON = await response.json();

    if (!response.ok)
        return next(new APIError(resJSON.message, response.status));

    res.status(response.status).json(resJSON);
});
