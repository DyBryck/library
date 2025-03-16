import { NotFoundError } from "../errors/customErrors.js";
import { bookRepository } from "../repositories/index.js";

export const getAllBooks = async (filter = {}) => {
  return await bookRepository.getAll(filter);
};

export const getBookByID = async (id) => {
  return await bookRepository.getByID(id);
};

export const getFirstAvailableCopyByBookID = async (id) => {
  const copy = await bookRepository.getFirstAvailableCopyByID(id);
  if (!copy) {
    throw new NotFoundError("Exemplaire indisponible / introuvable");
  }
  return copy;
};
