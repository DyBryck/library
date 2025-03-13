import { Repository } from "./Repository.js";

export class BookRepository extends Repository {
  async getAll() {
    return this.db.all("SELECT * FROM livre;");
  }

  async getByID(id) {
    return this.db.get("SELECT * FROM livre WHERE id_livre = ?;", [id]);
  }

  async getCopyByID(id) {
    return this.db.get("SELECT * FROM exemplaire WHERE id_livre = ? AND disponible = 1;", [id]);
  }
}
