import fs from "fs";
import { execSync } from "child_process";

const pid = fs.readFileSync("./test/org_api.pid", "utf8");
execSync(`kill ${pid}`);
