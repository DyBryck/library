import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __direname = path.dirname(__filename);

export const DB_FILE = path.join(__direname, "..", "database", "library.db");

export const SERVER_PORT = process.env.PORT || 3000;
