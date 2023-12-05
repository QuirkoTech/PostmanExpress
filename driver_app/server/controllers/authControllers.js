import catchAsync from "./../helpers/catchAsync.js";
import pool from "./../db.js";
import { v4 } from "uuid";
import APIError from "../helpers/APIError.js";
import signTokens from "./../helpers/signTokens.js";
import bcrypt from "bcrypt";

const cookieConfig = {
    httpOnly: true,
    path: "/",
    sameSite: "None",
    secure: true,
    domain: process.env.DRIVER_APP_DOMAIN,
};

export const logIn = catchAsync(async (req, res, next) => {
    const { driver_email, password } = req.body;

    if (!password || !driver_email)
        return next(new APIError("Some required fields missing.", 400));

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const driver = await client.query(
            "SELECT * FROM drivers WHERE driver_email = $1",
            [driver_email],
        );

        if (driver.rowCount === 0) {
            await client.query("ROLLBACK");
            client.release();
            return next(new APIError("No driver found with this email.", 404));
        }

        const isMatch = await bcrypt.compare(password, driver.rows[0].password);

        if (isMatch === false) {
            await client.query("ROLLBACK");
            client.release();
            return next(new APIError("Invalid credentials.", 403));
        }

        const { accessToken, refreshToken } = signTokens(
            "driver",
            driver.rows[0].driver_id,
        );

        await client.query(
            "UPDATE drivers SET refresh_token = $1 WHERE driver_id = $2",
            [refreshToken, driver.rows[0].driver_id],
        );

        await client.query("COMMIT");
        client.release();

        res.cookie("access_token", accessToken, cookieConfig);
        res.status(201).json({ status: "success" });
    } catch (error) {
        try {
            await client.query("ROLLBACK");
        } catch (rollbackError) {
            console.error("Driver log in rollback failed: ", rollbackError);
        }

        console.error(error);
        client.release();
        return next(
            new APIError("Couldn't perform log in, try again later.", 500),
        );
    }
});

export const signUp = catchAsync(async (req, res, next) => {
    const { driver_email, password, driver_name, driver_location, signup_key } =
        req.body;

    if (signup_key !== process.env.DRIVER_SIGNUP_KEY)
        return next(new APIError("Wrong driver signup key.", 400));

    if (!driver_name || !driver_email || !password || !driver_location)
        return next(new APIError("Some required fields missing.", 400));

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const driver = await pool.query(
            "SELECT * FROM drivers WHERE driver_email = $1",
            [driver_email],
        );

        if (driver.rowCount > 0) {
            await client.query("ROLLBACK");
            client.release();
            return next(new APIError("Driver already exists.", 409));
        }

        const hashedPwd = await bcrypt.hash(password, 10);

        const driver_id = v4();

        const { accessToken, refreshToken } = signTokens("driver", driver_id);

        await client.query(
            "INSERT INTO drivers(driver_id, driver_name, driver_email, password, refresh_token, driver_location) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
            [
                driver_id,
                driver_name,
                driver_email,
                hashedPwd,
                refreshToken,
                driver_location,
            ],
        );

        await client.query("COMMIT");
        client.release();

        res.cookie("access_token", accessToken, cookieConfig);
        res.status(201).json({ status: "success" });
    } catch (error) {
        try {
            await client.query("ROLLBACK");
        } catch (rollbackError) {
            console.error("Driver signup rollback failed: ", rollbackError);
        }

        console.error(error);
        client.release();
        return next(
            new APIError("Couldn't perform sign up, try again later.", 500),
        );
    }
});

// eslint-disable-next-line no-unused-vars
export const logOut = catchAsync(async (req, res, next) => {
    res.clearCookie("access_token", cookieConfig);
    res.status(201).json({ status: "success" });
});
