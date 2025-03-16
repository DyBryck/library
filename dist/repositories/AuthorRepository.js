var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Author } from "../models/Author.js";
import { Repository } from "./Repository.js";
export class AuthorRepository extends Repository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const authorList = yield this.db.all("SELECT * FROM auteur;");
            return authorList.map((row) => new Author(row.id_auteur, row.nom, row.prenom, row.date_naissance, row.nationalite));
        });
    }
    getByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const author = yield this.db.get("SELECT * FROM auteur WHERE id_auteur = ?;", [id]);
            return new Author(author.id_auteur, author.nom, author.prenom, author.date_naissance, author.nationalite);
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { lastName, firstName, birthDate, nationality } = body;
            const result = yield this.db.run("INSERT INTO auteur (nom, prenom, date_naissance, nationalite) VALUES (?, ?, ?, ?);", [lastName, firstName, birthDate, nationality]);
            if (!result.lastID) {
                throw new Error("Échec lors de la création de l'auteur");
            }
            return yield this.getByID(result.lastID);
        });
    }
    update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const oldAuthor = yield this.getByID(id);
            if (!oldAuthor) {
                return null;
            }
            const lastName = (_a = body.lastName) !== null && _a !== void 0 ? _a : oldAuthor.lastName;
            const firstName = (_b = body.firstName) !== null && _b !== void 0 ? _b : oldAuthor.firstName;
            const birthDate = (_c = body.birthDate) !== null && _c !== void 0 ? _c : oldAuthor.birthDate;
            const nationality = (_d = body.nationality) !== null && _d !== void 0 ? _d : oldAuthor.nationality;
            const newAuthor = {
                id: oldAuthor.id,
                lastName: lastName,
                firstName: firstName,
                birthDate: birthDate,
                nationality: nationality,
            };
            if (JSON.stringify(oldAuthor) === JSON.stringify(newAuthor))
                throw new Error("Rien n'a changé");
            yield this.db.run(`
      UPDATE auteur
      SET nom = ?, prenom = ?, date_naissance = ?, nationalite = ?
      WHERE id_auteur = ?;
    `, [lastName, firstName, birthDate, nationality, id]);
            return yield this.getByID(id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const author = this.getByID(id);
            if (!author)
                return null;
            yield this.db.run("DELETE FROM auteur WHERE id_auteur = ?;", [id]);
            return author;
        });
    }
}
//# sourceMappingURL=AuthorRepository.js.map