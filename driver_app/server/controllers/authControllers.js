import catchAsync from "./../helpers/catchAsync.js";
import pool from "./../db.js";
import { v4 } from "uuid";
import APIError from "../helpers/APIError.js";
import signTokens from "./../helpers/signTokens.js";
import bcrypt from "bcrypt";

export const logIn = catchAsync(async (req, res, next) => {
    const { driver_email, password } = req.body;
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

        if (driver.rows.length > 0) {
            await client.query("ROLLBACK");
            client.release();
            return next(new APIError("Driver already exists.", 409));
        }

        const hashedPwd = await bcrypt.hash(password, 10);

        const driver_id = v4();

        const { accessToken, refreshToken } = signTokens("driver", driver_id);
        console.log(accessToken, refreshToken);

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

        res.status(201).json({ status: "success", access_token: accessToken });
    } catch (error) {
        try {
            await client.query("ROLLBACK");
        } catch (rollbackError) {
            console.error("Driver signup rollback failed: ", rollbackError);
        }

        client.release();
        return next(
            new APIError("Couldn't perform sign up, try again later.", 500),
        );
    }
});
