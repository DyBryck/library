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
export class BookRepository extends Repository {
    getAll() {
        return __awaiter(this, arguments, void 0, function* ({ categorie, auteur, page, limit } = {}) {
            let query = "SELECT * FROM livre";
            const params = [];
            const conditions = [];
            if (categorie) {
                conditions.push("categorie_id = ?");
                params.push(categorie);
            }
            if (auteur) {
                conditions.push("auteur_id = ?");
                params.push(auteur);
            }
            if (conditions.length > 0) {
                query += " WHERE " + conditions.join(" AND ");
            }
            let paginatedQuery = query;
            let paginatedParams = [...params];
            let pageNum, limitNum, offset;
            if (page && limit) {
                pageNum = Number(page) || 1;
                limitNum = Number(limit) || 10;
                offset = (pageNum - 1) * limitNum;
                paginatedQuery += " LIMIT ? OFFSET ?";
                paginatedParams.push(limitNum, offset);
            }
            const data = yield this.db.all(paginatedQuery, paginatedParams);
            const countQuery = "SELECT COUNT(*) as total FROM livre" +
                (conditions.length > 0 ? " WHERE " + conditions.join(" AND ") : "");
            const countResult = yield this.db.get(countQuery, params);
            const total = countResult.total;
            const totalPages = limitNum ? Math.ceil(total / limitNum) : 1;
            return {
                data,
                meta: {
                    page: pageNum || 1,
                    limit: limitNum || total,
                    total,
                    totalPages,
                },
            };
        });
    }
    getByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.get("SELECT * FROM livre WHERE id_livre = ?;", [id]);
        });
    }
    // TBD
    getAllCopiesByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.get("SELECT * FROM livre");
        });
    }
    getFirstAvailableCopyByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.get("SELECT * FROM exemplaire WHERE id_livre = ? AND disponible = 1;", [id]);
        });
    }
}
//# sourceMappingURL=BookRepository.js.map