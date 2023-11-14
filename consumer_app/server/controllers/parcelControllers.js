import APIError from "./../helpers/APIError.js";
import catchAsync from "./../helpers/catchAsync.js";
import sendRequest from "./../helpers/sendRequestToOrgAPI.js";

export const newParcel = catchAsync(async (req, res, next) => {
    let { package_name, recipient_email, weight, height, width, length } =
        req.body;

    if (!recipient_email || !weight || !height || !width || !length)
        return next(new APIError("Some required fields missing.", 400));

    if (!package_name) req.body.package_name = "Parcel";

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
