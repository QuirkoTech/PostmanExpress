import catchAsync from "./catchAsync.js";

export const protectConsumer = catchAsync(async (req, res, next) => {
    const orgType = req.headers["x-Organization-type"];
    if (orgType !== process.env.CONSUMER_APP_HEADER)
        return next(new APIError("Invalid API key.", 400));

    next();
});

export const protectDriver = catchAsync(async (req, res, next) => {
    const orgType = req.headers["x-Organization-type"];
    if (orgType !== process.env.DRIVER_APP_HEADER)
        return next(new APIError("Invalid API key.", 400));

    next();
});
