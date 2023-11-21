import fs from "fs";
const { execSync } = require("child_process");

const pid = fs.readFileSync("./test/org_api.pid", "utf8");
execSync(`kill ${pid}`);
