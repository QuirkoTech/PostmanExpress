import APIError from "./APIError.js";
import catchAsync from "./catchAsync.js";

const protect = catchAsync(async (req, res, next) => {
    if (!req.cookies["access_token"])
        return next(new APIError("You are not logged in.", 400));
    next();
});

export default protect;
