import "./config.js";
import pg from "pg";

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    max: 20,
};

const pool = new pg.Pool(dbConfig);

pool.connect((err, client, release) => {
    if (err) {
        return console.error("Error acquiring client", err.stack);
    }
    console.log("Database connected!");
    release();
});

export default pool;
