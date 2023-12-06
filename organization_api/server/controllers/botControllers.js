import generateParcels from "../bot/generator.js";
import catchAsync from "../helpers/catchAsync.js";
import APIError from "./../helpers/APIError.js";

export const botGenerateParcels = catchAsync(async (req, res, next) => {
    const result = await generateParcels();

    if (result.status !== "success") {
        return next(new APIError(result.message, result.code));
    }

    res.status(200).json(result);
});
