import { NotFoundError } from "../errors/customErrors.js";
import { bookRepository } from "../repositories/index.js";

export const getAllBooks = async () => {
  return await bookRepository.getAll();
};

export const getBookByID = async (id) => {
  return await bookRepository.getByID(id);
};

export const getBookCopyByID = async (id) => {
  const copy = await bookRepository.getCopyByID(id);
  if (!copy) {
    throw new NotFoundError("Exemplaire non disponible / introuvable");
  }
  return copy;
};
