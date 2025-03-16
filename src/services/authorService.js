import { NotFoundError } from "../errors/customErrors.js";
import { authorRepository } from "../repositories/index.js";
import { validateAuthor } from "../validations/authorValidation.js";

export const getAllAuthors = async () => {
  return await authorRepository.getAll();
};

export const getAuthorByID = async (id) => {
  const author = await authorRepository.getByID(id);
  if (!author) {
    throw new NotFoundError("Auteur non trouvé");
  }
  return author;
};

export const createAuthor = async (body) => {
  validateAuthor(body);

  const author = await authorRepository.create(body);
  return author;
};

export const updateAuthor = async (id, body) => {
  validateAuthor(body, { partial: true });

  const author = await authorRepository.update(id, body);

  if (!author) {
    throw new NotFoundError("Auteur non trouvé");
  }

  return author;
};

export const deleteAuthor = async (id) => {
  const author = await authorRepository.delete(id);

  if (!author) {
    throw new NotFoundError("Auteur non trouvé");
  }

  return author;
};
