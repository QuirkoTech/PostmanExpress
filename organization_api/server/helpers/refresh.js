import pool from "../db.js";
import APIError from "./APIError.js";
import catchAsync from "./catchAsync.js";
import signTokens from "./signTokens.js";

const refresh = catchAsync(async (req, res, next) => {
    const { accessToken, refreshToken } = signTokens(
        "consumer",
        req.user.user_id,
    );

    const result = await pool.query(
        "UPDATE users SET refresh_token = $1 WHERE user_id = $2 RETURNING *",
        [refreshToken, req.user.user_id],
    );

    if (result.rowCount === 0)
        return next(new APIError("Couldn't refresh your session.", 500));
    next();
});

export default refresh;
