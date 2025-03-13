import { Author } from "../models/Author.js";
import { Repository } from "./Repository.js";

export class AuthorRepository extends Repository {
  async getAll() {
    const authorList = await this.db.all("SELECT * FROM auteur;");
    return authorList.map(
      (row) => new Author(row.id_auteur, row.nom, row.prenom, row.date_naissance, row.nationalite),
    );
  }

  async getByID(id) {
    const author = await this.db.get("SELECT * FROM auteur WHERE id_auteur = ?;", [id]);
    return new Author(
      author.id_auteur,
      author.nom,
      author.prenom,
      author.date_naissance,
      author.nationalite,
    );
  }

  async create(body) {
    const { lastName, firstName, birthDate, nationality } = body;
    const result = await this.db.run(
      "INSERT INTO auteur (nom, prenom, date_naissance, nationalite) VALUES (?, ?, ?, ?);",
      [lastName, firstName, birthDate, nationality],
    );

    if (!result.lastID) {
      throw new Error("Échec lors de la création de l'auteur");
    }

    return await this.getByID(result.lastID);
  }

  async update(id, body) {
    const oldAuthor = await this.getByID(id);
    if (!oldAuthor) {
      return null;
    }

    const lastName = body.lastName ?? oldAuthor.lastName;
    const firstName = body.firstName ?? oldAuthor.firstName;
    const birthDate = body.birthDate ?? oldAuthor.birthDate;
    const nationality = body.nationality ?? oldAuthor.nationality;

    const newAuthor = {
      id: oldAuthor.id,
      lastName: lastName,
      firstName: firstName,
      birthDate: birthDate,
      nationality: nationality,
    };

    if (JSON.stringify(oldAuthor) === JSON.stringify(newAuthor)) throw new Error("Rien n'a changé");

    const result = await this.db.run(
      `
      UPDATE auteur
      SET nom = ?, prenom = ?, date_naissance = ?, nationalite = ?
      WHERE id_auteur = ?;
    `,
      [lastName, firstName, birthDate, nationality, id],
    );

    return await this.getByID(id);
  }

  async delete(id) {
    const author = this.getByID(id);
    if (!author) return null;

    await this.db.run("DELETE FROM auteur WHERE id_auteur = ?;", [id]);

    return author;
  }
}
