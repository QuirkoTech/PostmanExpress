import pool from "../db.js";

const generateUniquePin = async (pinType) => {
    const column = pinType === "delivery" ? "delivery_pin" : "pickup_pin";
    const query = `SELECT delivery_pin FROM parcels WHERE ${column} IS NOT NULL`;

    const takenPins = await pool.query(query);

    let isUnique = false;
    let newPin;

    while (!isUnique) {
        newPin = Math.floor(Math.random() * 100000);
        isUnique = !takenPins.rows.some(
            (pinObj) => pinObj.delivery_pin === newPin,
        );
    }

    return newPin;
};

export default generateUniquePin;
