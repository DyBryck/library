import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = path.dirname(__filename);
const logFilePath = path.join(__dirname, "../", "..", "/logs", "logs.txt");
export const appendLog = (message) => {
    const logMessage = `${new Date().toISOString()} - ${message}\n`;
    fs.appendFileSync(logFilePath, logMessage, "utf8");
};
//# sourceMappingURL=logger.js.map