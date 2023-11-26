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
