import APIError from "../helpers/APIError.js";
import catchAsync from "../helpers/catchAsync.js";
import axios from "axios";

export const signUp = catchAsync(async (req, res, next) => {
    const { password, password_confirm } = req.body;

    if (password !== password_confirm)
        return next(new APIError("Passwords dont match.", 400));

    axios.post(`${process.env.ORGANIZATION_API_URL}/consumer/signup`);

    res.status(200).json({ status: "success" });
});
