var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import connect from "../utils/databaseUtils.js";
export class Repository {
    constructor(dbFile) {
        this.dbFile = dbFile;
        this.db = null;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.db) {
                this.db = yield connect(this.dbFile);
                console.log(`Connexion à SQLite réussie pour ${this.constructor.name}`);
            }
            return this.db;
        });
    }
    static create(dbFile) {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = new this(dbFile);
            yield instance.connect();
            return instance;
        });
    }
}
//# sourceMappingURL=Repository.js.map