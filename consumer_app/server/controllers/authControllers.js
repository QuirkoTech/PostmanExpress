import APIError from "../helpers/APIError.js";
import catchAsync from "../helpers/catchAsync.js";

export const signUp = catchAsync(async (req, res, next) => {
    const { password, password_confirm } = req.body;

    if (password !== password_confirm)
        return next(new APIError("Passwords dont match.", 400));

    res.status(200).json({ status: "success" });
});
