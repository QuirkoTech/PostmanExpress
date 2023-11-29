import rateLimit from "express-rate-limit";

const message = (sec) => {
    return {
        status: "fail",
        message: `Too many requests, please try again after ${sec} seconds`,
    };
};

export const defaultLimiter = rateLimit({
    windowMs: 20 * 1000,
    max: 10,
    message: message(20),
});

export const strictLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 1,
    message: {
        status: "fail",
        message: `You can create parcels every 1 minute`,
    },
});
