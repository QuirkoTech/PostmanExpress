import APIError from "./../helpers/APIError.js";
import catchAsync from "./../helpers/catchAsync.js";
import sendRequest from "./../helpers/sendRequestToOrgAPI.js";

export const newParcel = catchAsync(async (req, res, next) => {
    let {
        parcel_name,
        recipient_email,
        weight,
        height,
        width,
        length,
        ship_from,
        ship_to,
    } = req.body;

    if (
        !recipient_email ||
        !weight ||
        !height ||
        !width ||
        !length ||
        !ship_to ||
        !ship_from
    )
        return next(new APIError("Some required fields missing.", 400));

    if (!parcel_name) req.body.parcel_name = "Parcel";

    const response = await sendRequest(
        "POST",
        "/parcels/new",
        {
            Authorization: `Bearer ${req.cookies["access_token"]}`,
        },
        req.body,
    );

    const resJSON = await response.json();

    if (!response.ok)
        return next(new APIError(resJSON.message, response.status));

    res.status(response.status).json(resJSON);
});

export const singleParcelInfo = catchAsync(async (req, res, next) => {
    const { parcel_id } = req.params;
    let headers = {};

    if (req.cookies["access_token"]) {
        headers = {
            Authorization: `Bearer ${req.cookies["access_token"]}`,
        };
    }

    const response = await sendRequest("GET", `/parcels/${parcel_id}`, headers);

    const resJSON = await response.json();

    if (!response.ok)
        return next(new APIError(resJSON.message, response.status));

    res.status(response.status).json(resJSON);
});
