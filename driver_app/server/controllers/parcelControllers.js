import catchAsync from "../helpers/catchAsync.js";
import sendRequest from "./../helpers/sendRequestToOrgAPI.js";
import APIError from "./../helpers/APIError.js";
import pool from "./../db.js";

export const singleParcelInfo = catchAsync(async (req, res, next) => {
    const { parcel_id } = req.params;

    let loggedDriverAccepted = false;
    let parcelAlreadyAccepted = false;

    const parcelDriver = await pool.query(
        "SELECT * FROM driver_parcels WHERE parcel_id = $1",
        [parcel_id],
    );

    if (parcelDriver.rowCount !== 0) {
        parcelAlreadyAccepted = true;
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

    resJSON.data.parcel_info.already_accepted = parcelAlreadyAccepted;

    res.status(response.status).json(resJSON);
});
