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
    res.status(201).json({ status: "success" });
});

export const consumerLogin = catchAsync(async (req, res, next) => {});

export const consumerLoad = catchAsync(async (req, res, next) => {});
