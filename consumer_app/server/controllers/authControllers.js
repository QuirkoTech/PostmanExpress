import APIError from "../helpers/APIError.js";
import catchAsync from "../helpers/catchAsync.js";
import hashPwd from "../helpers/hashPwd.js";
import sendRequest from "../helpers/sendRequestToOrgAPI.js";

export const cookieConfig = {
    httpOnly: true,
    path: "/",
    sameSite: "None",
    secure: true,
    domain: process.env.CONSUMER_APP_DOMAIN,
};

export const signUp = catchAsync(async (req, res, next) => {
    const { password, password_confirm, username, user_email, location } =
        req.body;

    if (!password || !password_confirm || !username || !user_email || !location)
        return next(new APIError("Some required fields missing.", 400));

    if (password !== password_confirm)
        return next(new APIError("Passwords dont match.", 400));

    const hashedPwd = await hashPwd(password);

    const userData = {
        username,
        user_email,
        password: hashedPwd,
        location,
    };

    const response = await sendRequest(
        "POST",
        "/consumer/signup",
        {},
        userData,
    );

    const resJSON = await response.json();

    if (!response.ok)
        return next(new APIError(resJSON.message, response.status));

    res.cookie("access_token", resJSON.access_token, cookieConfig);
    res.status(response.status).json({ status: resJSON.status });
});

export const logIn = catchAsync(async (req, res, next) => {
    const { password, user_email } = req.body;

    if (!password || !user_email)
        return next(new APIError("Some required fields missing.", 400));

    const userData = { password, user_email };

    const response = await sendRequest("POST", "/consumer/login", {}, userData);
    const resJSON = await response.json();

    if (!response.ok)
        return next(new APIError(resJSON.message, response.status));

    res.cookie("access_token", resJSON.access_token, cookieConfig);
    res.status(response.status).json({ status: resJSON.status });
});

// eslint-disable-next-line no-unused-vars
export const logOut = catchAsync(async (req, res, next) => {
    res.clearCookie("access_token", {
        path: "/",
        domain: process.env.CONSUMER_APP_DOMAIN,
    });
    res.status(201).json({ status: "success" });
});
