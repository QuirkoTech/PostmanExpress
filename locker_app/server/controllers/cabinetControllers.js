import catchAsync from "../helpers/catchAsync.js";
import APIError from "../helpers/APIError.js";
import sendRequest from "../helpers/sendRequestToOrgAPI.js";

export const checkPinLength = catchAsync(async (req, res, next) => {
    const { pin, cabinet_location } = req.body;

    if (!cabinet_location)
        return next(new APIError("No cabinet location provided.", 400));

    if (!pin) return next(new APIError("No pin provided.", 400));

    const isFiveDigits = /^\d{5}$/.test(pin);
    if (!isFiveDigits) return next(new APIError("Invalid pin.", 400));

    next();
});

export const pastePickupPin = catchAsync(async (req, res, next) => {
    const response = await sendRequest(
        "POST",
        `/cabinet/pickup`,
        {},
        { pin: req.body.pin, cabinet_location: req.body.cabinet_location },
    );

    const resJSON = await response.json();

    if (!response.ok)
        return next(new APIError(resJSON.message, response.status));

    res.status(response.status).json(resJSON);
});

export const pasteDeliveryPin = catchAsync(async (req, res, next) => {
    const response = await sendRequest(
        "POST",
        `/cabinet/deliver`,
        {},
        { pin: req.body.pin, cabinet_location: req.body.cabinet_location },
    );

    const resJSON = await response.json();

    if (!response.ok)
        return next(new APIError(resJSON.message, response.status));

    res.status(response.status).json(resJSON);
});
