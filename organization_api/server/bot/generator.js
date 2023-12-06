import pool from "../db.js";

const dummyParcels = [
    "Star Wars poster",
    "Shiny cup",
    "Book collection",
    "Linux Ubuntu book",
    "Phonecase for iPhone 15",
    "Linear algebra book",
    "100 Stickers",
    "Vintage record player",
    "Handmade scarf",
    "Set of watercolor paints",
    "Wireless headphones",
    "Yoga mat",
    "Bluetooth speaker",
    "Gourmet coffee beans",
    "Graphic novel",
    "Digital camera",
    "Tablet computer",
    "Designer sunglasses",
    "Board game",
    "Running shoes",
    "Electric kettle",
    "Smartwatch",
    "Backpack with solar panel",
    "Robot vacuum cleaner",
    "Professional chef's knife",
    "Portable hard drive",
    "Telescope for stargazing",
];

const generateParcels = async () => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const cabinets = await client.query(
            `SELECT COUNT(*) FROM cabinets WHERE cabinet_status = 'empty' AND cabinet_location = 'warehouse'`,
        );

        const freeCabinets = cabinets.rows[0].count * 1;
        if (freeCabinets === 0)
            return { message: "No empty cabinets at the moment.", code: 404 };

        const users = await client.query(
            "SELECT user_email, user_location FROM users WHERE user_email != 'Deleted' ORDER BY RANDOM() LIMIT $1",
            [freeCabinets],
        );

        let sender_id = await client.query(
            "SELECT user_id FROM users WHERE user_name = 'Amazon'",
            [],
        );

        sender_id = sender_id.rows[0].user_id;

        await Promise.all(
            users.rows.map(async (user) => {
                const randomIndex = Math.floor(
                    Math.random() * dummyParcels.length,
                );
                const randomParcel = dummyParcels[randomIndex];

                try {
                    const parcelResult = await client.query(
                        `INSERT INTO parcels 
                            (parcel_status, parcel_sender_id, parcel_receiver_email, height, length, width, weight, status_timestamps, ship_to, ship_from, notify, parcel_name, current_location)
                        VALUES (
                        'at warehouse',
                        $1,
                        $2,
                        0.5,
                        0.5,
                        0.7,
                        1,
                        ARRAY[
                            jsonb_build_object('status', 'prepared for delivery', 'date', TO_CHAR( now() - interval '4 days', 'DD.MM.YY'), 'time', TO_CHAR(now() - interval '4 days', 'HH24:MI') ),
                            jsonb_build_object('status', 'en route to the warehouse', 'date', TO_CHAR( now() - interval '3 days', 'DD.MM.YY'), 'time', TO_CHAR(now() - interval '3 days', 'HH24:MI') ),
                            jsonb_build_object('status', 'at warehouse', 'date', TO_CHAR( now() - interval '2 days', 'DD.MM.YY'), 'time', TO_CHAR(now() - interval '2 days', 'HH24:MI') ),
                            jsonb_build_object('status', 'en route to the warehouse', 'date', TO_CHAR( now() - interval '1 days', 'DD.MM.YY'), 'time', TO_CHAR(now() - interval '1 days', 'HH24:MI') ),
                            jsonb_build_object('status', 'at warehouse', 'date', TO_CHAR( now(), 'DD.MM.YY'), 'time', TO_CHAR(now(), 'HH24:MI') )
                        ],
                        $3,
                        'helsinki',
                        false,
                        $4,
                        'warehouse'
                        ) RETURNING parcel_id`,
                        [
                            sender_id,
                            user.user_email,
                            user.user_location,
                            randomParcel,
                        ],
                    );

                    await client.query(
                        `UPDATE cabinets
                    SET parcel_id = $1, cabinet_status = 'occupied'
                    WHERE cabinet_id IN (
                        SELECT cabinet_id
                        FROM cabinets
                        WHERE cabinet_status = 'empty' AND cabinet_location = 'warehouse'
                        LIMIT 1
                    )`,
                        [parcelResult.rows[0].parcel_id],
                    );
                    return true;
                } catch (error) {
                    throw error;
                }
            }),
        );

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
