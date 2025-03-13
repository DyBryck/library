import { NotFoundError } from "../errors/customErrors.js";
import { bookRepository, loanRepository, memberRepository } from "../repositories/index.js";
import { computeReturnDate } from "../utils/utils.js";
import { validateLoan } from "../validations/loanValidation.js";

export const getAllLoans = async () => {
  return await loanRepository.getAll();
};

export const getLoanByID = async (id) => {
  const loan = await loanRepository.getByID(id);
  if (!loan) {
    throw new NotFoundError("Emprunt non trouvé");
  }
  return loan;
};

export const createLoan = async (body) => {
  const date = new Date();
  const dateFormated = date.toISOString().split("T")[0];
  const loan = { ...body, date_emprunt: dateFormated, date_retour_prevue: computeReturnDate() };

  const member = await memberRepository.getByID(body.id_membre);
  if (!member) {
    throw new NotFoundError("Le membre n'existe pas");
  }

  const book = await bookRepository.getByID(body.id_livre);
  if (!book) {
    throw new NotFoundError("Le livre n'existe pas");
  }

  const copy = await bookRepository.getCopyByID(body.id_livre);
  if (!copy) {
    throw new NotFoundError("Exemplaire non disponible / introuvable");
  }
  const finalLoan = { ...loan, id_exemplaire: copy.id_exemplaire };
  validateLoan(finalLoan);

  const loanCreated = await loanRepository.create(finalLoan);

  return loanCreated;
};

export const updateLoan = async (id, body) => {};

export const deleteLoan = async (id) => {
  const loan = await loanRepository.delete(id);

  if (!loan) {
    throw new NotFoundError("Emprunt non trouvé");
  }

  return loan;
};
