import pool from "../db.js";

const checkFreeCabinets = async (location) => {
    const freeCabinets = await pool.query(
        `SELECT * FROM cabinets WHERE cabinet_location = $1 AND cabinet_status = 'empty'`,
        [location],
    );
    return freeCabinets.rowCount !== 0;
};

export default checkFreeCabinets;
