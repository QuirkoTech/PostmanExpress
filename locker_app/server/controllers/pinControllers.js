import catchAsync from "./../helpers/catchAsync.js";
import APIError from "../helpers/APIError.js";
import sendRequest from "../helpers/sendRequestToOrgAPI.js";

export const checkPinLength = catchAsync(async (req, res, next) => {
    const { pin } = req.body;
    if (!pin) return next(new APIError("No pin provided.", 400));

    if (pin.length !== 5) return next(new APIError("Invalid pin length.", 400));
    next();
});

export const pastePickupPin = catchAsync(async (req, res, next) => {
    const response = await sendRequest(
        "POST",
        `/cabinet/pickup`,
        {},
        { pin: req.body.pin },
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
        { pin: req.body.pin },
    );

    const resJSON = await response.json();

    if (!response.ok)
        return next(new APIError(resJSON.message, response.status));

    res.status(response.status).json(resJSON);
});
