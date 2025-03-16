var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Repository } from "./Repository.js";
export class LoanRepository extends Repository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.all("SELECT * FROM emprunt;");
        });
    }
    getByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.get("SELECT * FROM emprunt WHERE id_emprunt = ?;", [id]);
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_membre, id_exemplaire, date_retour_prevue } = body;
            const result = yield this.db.run("INSERT INTO emprunt (id_membre, id_exemplaire, date_retour_prevue) VALUES (?, ?, ?);", [id_membre, id_exemplaire, date_retour_prevue]);
            if (!result.lastID) {
                throw new Error("Échec lors de la création de l'emprunt");
            }
            return yield this.getByID(result.lastID);
        });
    }
    update(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_emprunt, date_retour_effective } = body;
            const oldLoan = yield this.getByID(id_emprunt);
            if (oldLoan.date_retour_effective !== null) {
                throw new Error("L'emprunt a déjà été retourné");
            }
            yield this.db.run("UPDATE emprunt SET date_retour_effective = ? WHERE id_emprunt = ?;", [
                date_retour_effective,
                id_emprunt,
            ]);
            return this.getByID(id_emprunt);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const loan = this.getByID(id);
            yield this.db.run("DELETE FROM emprunt WHERE id_emprunt = ?;", [id]);
            return loan;
        });
    }
}
//# sourceMappingURL=LoanRepository.js.map