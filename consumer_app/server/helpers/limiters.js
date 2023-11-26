import rateLimit from "express-rate-limit";

const message = (sec) => {
    return {
        status: "fail",
        messsage: `Too many requests, please try again after ${sec} seconds`,
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
        messsage: `You can create parcels every 1 minute`,
    },
});
