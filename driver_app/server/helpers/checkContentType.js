import APIError from "./APIError.js";

const checkContentType = (req, res, next) => {
    const contentType = req.headers["content-type"];

    if (
        req.method === "POST" ||
        req.method === "PUT" ||
        req.method === "PATCH"
    ) {
        if (contentType === "application/json") {
            next();
        } else {
            return next(
                new APIError(
                    "Server requires Content-Type of application/json.",
                    400,
                ),
            );
        }
    } else {
        next();
    }
};

export default checkContentType;
