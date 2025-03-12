import { Repository } from "./Repository.js";

export class MemberRepository extends Repository {
  async getByID(id) {
    return await this.db.get("SELECT * FROM membre WHERE id_membre = ?;", [id]);
  }
}
