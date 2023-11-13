import APIError from "../helpers/APIError.js";
import catchAsync from "./../helpers/catchAsync.js";
import signTokens from "./../helpers/signTokens.js";
import pool from "../db.js";
import { v4 } from "uuid";
import bcrypt from "bcrypt";

export const consumerSignup = catchAsync(async (req, res, next) => {
    const { username, user_email, password, location } = req.body;

    if (!username || !user_email || !password || !location)
        return next(new APIError("Some required fields missing.", 400));

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const userEmailCheck = await client.query(
            "SELECT * FROM users WHERE user_email = $1",
            [user_email],
        );

        if (userEmailCheck.rowCount > 0) {
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
            console.error("User sign up rollback failed: ", rollbackError);
        }

        client.release();
        return next(
            new APIError("Couldn't perform sign up, try again later.", 500),
        );
    }
});

export const consumerLogin = catchAsync(async (req, res, next) => {
    const { password, user_email } = req.body;

    if (!password || !user_email)
        return next(new APIError("Some required fields missing.", 400));

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const user = await client.query(
            "SELECT * FROM users WHERE user_email = $1",
            [user_email],
        );

        if (user.rowCount === 0)
            return next(new APIError("No user found with this email.", 404));

        const isMatch = await bcrypt.compare(password, user.rows[0].password);

        if (isMatch === false) {
            return next(new APIError("Invalid credentials.", 403));
        }

        const { accessToken, refreshToken } = signTokens(
            "consumer",
            user.rows[0].user_id,
        );

        await client.query(
            "UPDATE users SET refresh_token = $1 WHERE user_id = $2",
            [refreshToken, user.rows[0].user_id],
        );

        await client.query("COMMIT");
        client.release();

        res.status(201).json({ status: "success", access_token: accessToken });
    } catch (error) {
        try {
            await client.query("ROLLBACK");
        } catch (rollbackError) {
            console.error("User log in rollback failed: ", rollbackError);
        }

        client.release();
        return next(
            new APIError("Couldn't perform log in, try again later.", 500),
        );
    }
});

export const consumerLoad = catchAsync(async (req, res, next) => {
    const parcelsToNotify = await pool.query(
        "SELECT parcel_id, parcel_status FROM parcels WHERE (parcel_sender_id = $1 OR parcel_receiver_email = $2) AND notify = 'true'",
        [req.user.user_id, req.user.user_email],
    );

    const notifications = parcelsToNotify.rows.map((parcel) => {
        return {
            title: "Status update",
            ...parcel,
        };
    });

    res.status(200).json({
        status: "success",
        data: {
            username: req.user.user_name,
            notifications,
        },
    });
});

export const userParcels = catchAsync(async (req, res, next) => {
    const userParcels = await pool.query(
        "SELECT (status_timestamps[array_upper(status_timestamps, 1)]->>'date') as last_status_date, parcel_id, parcel_status FROM parcels WHERE (parcel_sender_id = $1 OR parcel_receiver_email = $2) AND parcel_status != 'delivered'",
        [req.user.user_id, req.user.user_email],
    );

    res.status(200).json({
        status: "success",
        data: {
            user_parcels: userParcels.rows,
        },
    });
});
