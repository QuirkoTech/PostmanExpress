import pool from "./../db.js";
import catchAsync from "./catchAsync.js";
import APIError from "./APIError.js";
import jwt from "jsonwebtoken";

const protect = catchAsync(async (req, res, next) => {
    let accessToken;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        accessToken = req.headers.authorization.split(" ")[1];
    }

    if (!accessToken) return next(new APIError("No token provided.", 400));

    const payload = jwt.decode(accessToken, process.env.ACCESS_TOKEN_SECRET);

    if (!payload) return next(new APIError("Invalid token.", 401));

    const userId = payload.id;
    if (!userId) return next(new APIError("No user id provided", 400));

    let user;
    user = await pool.query(
        "SELECT user_id, user_name, user_email, refresh_token, user_location FROM users WHERE user_id = $1",
        [userId],
    );

    if (user.rowCount === 0 || user.rows[0].user_email === "Deleted")
        return next(new APIError("No user found.", 404));

    jwt.verify(
        user.rows[0].refresh_token,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err)
                return next(
                    new APIError("Session expired, please log in again.", 401),
                );
        },
    );

    req.user = user.rows[0];
    next();
});

export default protect;
