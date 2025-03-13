import { Repository } from "./Repository.js";

export class LoanRepository extends Repository {
  async getAll() {
    return await this.db.all("SELECT * FROM emprunt;");
  }

  async getByID(id) {
    return await this.db.get("SELECT * FROM emprunt WHERE id_emprunt = ?;", [id]);
  }

  async create(body) {
    const { id_membre, id_exemplaire, date_emprunt, date_retour_prevue } = body;
    const result = await this.db.run(
      "INSERT INTO emprunt (id_membre, id_exemplaire, date_emprunt, date_retour_prevue) VALUES (?, ?, ?, ?);",
      [id_membre, id_exemplaire, date_emprunt, date_retour_prevue],
    );

    if (!result.lastID) {
      throw new Error("Échec lors de la création de l'emprunt");
    }

    return await this.getByID(result.lastID);
  }

  async update(id, body) {}

  async delete(id) {}
}
