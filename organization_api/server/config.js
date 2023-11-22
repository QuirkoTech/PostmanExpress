import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import dotenv from "dotenv";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let filePath = `${__dirname}/../.env`;

if (process.env.NODE_ENV === "test")
    filePath = `${__dirname}/../../../../../../env/postman.express-organization_api.env`;

if (fs.existsSync(filePath)) {
    dotenv.config({ path: filePath });
} else {
    console.log("Enviroment file not found!");
}
