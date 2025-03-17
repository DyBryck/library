import { Repository } from "./Repository.js";

export class BookRepository extends Repository {
  async getAll({ categorie, auteur, page, limit } = {}) {
    let query = "SELECT * FROM vue_livres_complete";
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

    const data = await this.db.all(paginatedQuery, paginatedParams);

    const countQuery =
      "SELECT COUNT(*) as total FROM livre" +
      (conditions.length > 0 ? " WHERE " + conditions.join(" AND ") : "");
    const countResult = await this.db.get(countQuery, params);
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
  }

  async getByID(id) {
    return this.db.get("SELECT * FROM livre WHERE id_livre = ?;", [id]);
  }

  // TBD
  async getAllCopiesByID(id) {
    return this.db.get("SELECT * FROM livre");
  }

  async getFirstAvailableCopyByID(id) {
    return this.db.get("SELECT * FROM exemplaire WHERE id_livre = ? AND disponible = 1;", [id]);
  }
}
