import cron from "node-cron";
import generateParcels from "./generator.js";

cron.schedule("0 */6 * * *", async () => {
    const result = await generateParcels();
    if (!result.status) {
        console.error("Bot error: ", result);
    }
});
