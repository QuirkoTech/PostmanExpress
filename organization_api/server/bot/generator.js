import pool from "../db.js";

const generateParcels = async () => {
    const client = await pool.connect();

    try {
        await client.query("COMMIT");
        client.release();
        return { status: "success" };
    } catch (error) {
        try {
            await client.query("ROLLBACK");
        } catch (rollbackError) {
            console.error("Pick up pin paste rollback failed: ", rollbackError);
        }

        console.error(error);
        client.release();
        return { message: "Couldn't generate parcels.", code: 500 };
    }
};

export default generateParcels;
