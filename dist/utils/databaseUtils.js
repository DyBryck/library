var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { open } from "sqlite";
import sqlite3 from "sqlite3";
const connect = (dbfile) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield open({
            filename: dbfile,
            driver: sqlite3.Database,
        });
        yield db.run("PRAGMA foreign_keys = ON");
        return db;
    }
    catch (error) {
        console.error("Erreur lors de la connexion à SQLite:", error);
        throw error;
    }
});
export default connect;
//# sourceMappingURL=databaseUtils.js.map