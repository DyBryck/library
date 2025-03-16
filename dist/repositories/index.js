import { DB_FILE } from "../config/config.js";
import { AuthorRepository } from "./AuthorRepository.js";
import { BookRepository } from "./BookRepository.js";
import { LoanRepository } from "./LoanRepository.js";
import { MemberRepository } from "./MemberRepository.js";
const repositories = [AuthorRepository, LoanRepository, MemberRepository, BookRepository];
const [authorRepository, loanRepository, memberRepository, bookRepository] = await Promise.all(repositories.map((RepoClass) => RepoClass.create(DB_FILE)));
export { authorRepository, bookRepository, loanRepository, memberRepository };
//# sourceMappingURL=index.js.map