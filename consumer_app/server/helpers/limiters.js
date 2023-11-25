import rateLimit from "express-rate-limit";

const message = (sec) => {
    return {
        status: "fail",
        messsage: `Too many requests, please try again after ${sec} seconds`,
    };
};

export const defaultLimiter = rateLimit({
    windowMs: 20 * 1000,
    max: 5,
    message: message(20),
});

export const strictLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 1,
    message: message(60),
});
