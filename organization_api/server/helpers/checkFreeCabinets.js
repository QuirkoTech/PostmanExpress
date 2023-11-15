import pool from "../db.js";

// const reserveCabinet = async (parcel_id, location) => {
//     // Reserve a cabinet
//     const client = await pool.connect();

//     try {
//         // await client.query("BEGIN");

//         // const freeCabinets = await client.query(
//         //     `SELECT * FROM cabinets WHERE cabinet_location = $1 AND cabinet_status = 'empty'`,
//         //     [location],
//         // );

//         // if (freeCabinets.rowCount === 0) {
//         //     await client.query("ROLLBACK");
//         //     client.release();
//         //     return {
//         //         status: 404,
//         //         message: "No available cabinets at the moment.",
//         //     };
//         // }

//         // const deliveryPins = await client.query(
//         //     "SELECT delivery_pin FROM parcels WHERE delivery_pin IS NOT NULL",
//         // );

//         // let delivery_pin = generateUniquePin(deliveryPins.rows);

//         await client.query(
//             "WITH selected_cabinet AS \
//              (SELECT \
//                 cabinet_id FROM cabinets \
//                 WHERE \
//                 cabinet_location = $1 AND cabinet_status = 'empty' \
//                 LIMIT 1 ) \
//              UPDATE \
//              cabinets \
//                 SET \
//                 parcel_id = $2, cabinet_status = 'reserved' \
//                 FROM selected_cabinet \
//                 WHERE \
//                 cabinets.cabinet_id = selected_cabinet.cabinet_id",
//             [location, parcel_id],
//         );

//         await client.query("COMMIT");
//         client.release();
//         return { status: 200, delivery_pin };
//     } catch (error) {
//         try {
//             await client.query("ROLLBACK");
//         } catch (rollbackError) {
//             console.error("Reserve cabinet rollback failed: ", rollbackError);
//         }

//         console.log(error);

//         client.release();
//         return { status: 500, message: "Something went wrong." };
//     }
// };

// export default reserveCabinet;

const checkFreeCabinets = async (location) => {
    const freeCabinets = await pool.query(
        `SELECT * FROM cabinets WHERE cabinet_location = $1 AND cabinet_status = 'empty'`,
        [location],
    );
    return freeCabinets.rowCount !== 0;
};

export default checkFreeCabinets;
