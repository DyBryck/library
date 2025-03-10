import { Author } from "../models/Author.js";
import { Repository } from "./Repository.js";

export class AuthorRepository extends Repository {
  async getAll() {
    const authorList = await this.db.all("SELECT * FROM auteur;");
    return authorList.map(
      (row) =>
        new Author(
          row.id_auteur,
          row.nom,
          row.prenom,
          row.date_naissance,
          row.nationalite,
        ),
    );
  }
}
