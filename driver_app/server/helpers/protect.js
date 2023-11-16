import APIError from "./APIError.js";
import catchAsync from "./catchAsync.js";
import jwt from "jsonwebtoken";
import pool from "./../db.js";

const protect = catchAsync(async (req, res, next) => {
    if (!req.cookies["access_token"])
        return next(new APIError("You are not logged in.", 400));

    const payload = jwt.decode(
        req.cookies["access_token"],
        process.env.ACCESS_TOKEN_SECRET,
    );

    if (!payload) return next(new APIError("Invalid token.", 401));

    const driverId = payload.id;
    if (!driverId) return next(new APIError("No driver id provided", 400));

    let driver;
    driver = await pool.query(
        "SELECT driver_id, driver_name, driver_email, refresh_token, driver_location FROM drivers WHERE driver_id = $1",
        [driverId],
    );

    if (driver.rows.length === 0)
        return next(new APIError("No driver found.", 404));

    jwt.verify(
        driver.rows[0].refresh_token,
        process.env.REFRESH_TOKEN_SECRET,
        // eslint-disable-next-line no-unused-vars
        (err, decoded) => {
            if (err)
                return next(
                    new APIError("Session expired, please log in again.", 401),
                );
        },
    );

    req.driver = driver.rows[0];

    next();
});

export default protect;
