import { DB_FILE } from "../config/config.js";
import { AuthorRepository } from "./authorRepository.js";

export const authorRepository = await AuthorRepository.create(DB_FILE);
