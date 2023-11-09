import APIError from "../helpers/APIError.js";
import catchAsync from "../helpers/catchAsync.js";
import sendRequest from "../helpers/sendRequestToOrgAPI.js";
// import axios from "axios";
import bcrypt from "bcrypt";

export const signUp = catchAsync(async (req, res, next) => {
    const { password, password_confirm, username, user_email, location } =
        req.body;

    if (!password || !password_confirm || !username || !user_email || !location)
        return next(new APIError("Some required fields missing.", 400));

    if (password !== password_confirm)
        return next(new APIError("Passwords dont match.", 400));

    const hashedPwd = await bcrypt.hash(password, 10);

    const userData = {
        username,
        user_email,
        password: hashedPwd,
        location,
    };

    // const response = await axios.post(
    //     `${process.env.ORGANIZATION_API_URL}/consumer/signup`,
    //     userData,
    // );

    const response = await sendRequest(
        "POST",
        "/consumer/signup",
        {},
        userData,
    );

    if (response.status !== 201) {
        res.status(response.status).json(response.data);
    }

    res.status(response.status).json({ status: "success" });
});
