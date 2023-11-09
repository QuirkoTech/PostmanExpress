import APIError from "../helpers/APIError.js";
import catchAsync from "./../helpers/catchAsync.js";
import signTokens from "./../helpers/signTokens.js";
import pool from "../db.js";
import { v4 } from "uuid";

export const consumerSignup = catchAsync(async (req, res, next) => {
    const { username, user_email, password, location } = req.body;

    if (!username || !user_email || !password || !location)
        return next(new APIError("Some required fields missing.", 400));

    // Code to sign up

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const userEmailCheck = await client.query(
            "SELECT COUNT(*) FROM users WHERE user_email = $1",
            [user_email],
        );

        if (parseInt(userEmailCheck.rows[0].count, 10) > 0) {
            await client.query("ROLLBACK");
            client.release();
            return next(
                new APIError("User with this email already exists.", 409),
            );
        }

        const user_id = v4();

        const { accessToken, refreshToken } = signTokens("consumer", user_id);

        await client.query(
            "INSERT INTO users(user_id, user_name, user_email, password, refresh_token, user_location) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
            [user_id, username, user_email, password, refreshToken, location],
        );

        await client.query("COMMIT");
        client.release();

        res.status(201).json({ status: "success", access_token: accessToken });
    } catch (error) {
        try {
            await client.query("ROLLBACK");
        } catch (rollbackError) {
            console.error("User signup rollback failed: ", rollbackError);
        }

        console.log(error);

        client.release();
        return next(
            new APIError("Couldn't perform sign up, try again later.", 500),
        );
    }
});

export const consumerLogin = catchAsync(async (req, res, next) => {});

export const consumerLoad = catchAsync(async (req, res, next) => {});
