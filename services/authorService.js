import { authorRepository } from "../repositories/index.js";

export const getAllAuthors = async () => {
  return await authorRepository.getAll();
};
