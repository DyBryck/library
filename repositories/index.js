import { DB_FILE } from "../config/config.js";
import { AuthorRepository } from "./authorRepository.js";
import { LoanRepository } from "./LoanRepository.js";
import { MemberRepository } from "./MemberRepository.js";

const repositories = [AuthorRepository, LoanRepository, MemberRepository];

const [authorRepository, loanRepository, memberRepository] = await Promise.all(
  repositories.map((RepoClass) => RepoClass.create(DB_FILE)),
);

export { authorRepository, loanRepository, memberRepository };
