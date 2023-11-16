import catchAsync from "../helpers/catchAsync.js";
import sendRequest from "./../helpers/sendRequestToOrgAPI.js";
import APIError from "./../helpers/APIError.js";

export const singleParcelInfo = catchAsync(async (req, res, next) => {
    const { parcel_id } = req.params;
    let headers = {
        "x-driver-location": req.driver.driver_location,
    };

    const response = await sendRequest("GET", `/parcels/${parcel_id}`, headers);

    const resJSON = await response.json();

    if (!response.ok)
        return next(new APIError(resJSON.message, response.status));

    res.status(response.status).json(resJSON);
});
