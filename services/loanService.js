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
  const loan = { ...body, date_retour_prevue: computeReturnDate() };
  validateLoan(loan);

  const member = await memberRepository.getByID(body.id_membre);
  if (!member) {
    throw new NotFoundError("Le membre n'existe pas");
  }

  const book = await bookRepository.getByID(body.id_livre);
  if (!book) {
    throw new NotFoundError("Le livre n'existe pas");
  }

  const copy = await bookRepository.getFirstAvailableCopyByID(body.id_livre);
  if (!copy) {
    throw new NotFoundError("Exemplaire non disponible / introuvable");
  }
  const finalLoan = { ...loan, id_exemplaire: copy.id_exemplaire };

  const loanCreated = await loanRepository.create(finalLoan);

  return loanCreated;
};

export const updateLoan = async (body) => {
  validateLoan(body, true);

  const loan = await loanRepository.getByID(body.id_emprunt);
  if (!loan) {
    throw new NotFoundError("Emprunt non trouvé");
  }

  const date = new Date();
  const dateFormated = date.toISOString().split("T")[0];

  const newLoan = { ...loan, date_retour_effective: dateFormated };

  const loanUpdated = await loanRepository.update(newLoan);
  if (!loanUpdated) {
    throw new NotFoundError("Emprunt mis à jour non trouvé");
  }

  return loanUpdated;
};

export const deleteLoan = async (id) => {
  const loan = await loanRepository.delete(id);

  if (!loan) {
    throw new NotFoundError("Emprunt non trouvé");
  }

  return loan;
};
