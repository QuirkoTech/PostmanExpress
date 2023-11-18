import catchAsync from "../helpers/catchAsync.js";
import sendRequest from "../helpers/sendRequestToOrgAPI.js";
import APIError from "../helpers/APIError.js";
import { cookieConfig } from "./authControllers.js";

export const userLoad = catchAsync(async (req, res, next) => {
    const response = await sendRequest("GET", "/consumer/me", {
        Authorization: `Bearer ${req.cookies["access_token"]}`,
    });

    const resJSON = await response.json();

    if (!response.ok)
        return next(new APIError(resJSON.message, response.status));

    res.status(response.status).json(resJSON);
});

export const userParcels = catchAsync(async (req, res, next) => {
    const response = await sendRequest("GET", "/consumer/me/parcels", {
        Authorization: `Bearer ${req.cookies["access_token"]}`,
    });

    const resJSON = await response.json();

    if (!response.ok)
        return next(new APIError(resJSON.message, response.status));

    res.status(response.status).json(resJSON);
});

export const deletedUser = catchAsync(async (req, res, next) => {
    const response = await sendRequest("DELETE", "/consumer/me", {
        Authorization: `Bearer ${req.cookies["access_token"]}`,
    });

    const resJSON = await response.json();

    if (!response.ok)
        return next(new APIError(resJSON.message, response.status));

    res.clearCookie("access_token", cookieConfig);

    res.status(response.status).json(resJSON);
});
