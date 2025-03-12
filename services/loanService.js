import { NotFoundError } from "../errors/customErrors.js";
import { loanRepository } from "../repositories/index.js";
import { validateLoan } from "../validations/loanValidation.js";

export const getAllLoans = async () => {
  return await loanRepository.getAll();
};

export const getLoanByID = async (id) => {
  const loan = await loanRepository.getByID(id);
  if (!loan) {
    throw new NotFoundError("Auteur non trouvé");
  }
  return loan;
};

export const createLoan = async (body) => {
  validateLoan(body);

  const loan = await loanRepository.create(body);
  return loan;
};

export const updateLoan = async (id, body) => {
  validateLoan(body, { partial: true });

  const loan = await loanRepository.update(id, body);

  if (!loan) {
    throw new NotFoundError("Auteur non trouvé");
  }

  return loan;
};

export const deleteLoan = async (id) => {
  const loan = await loanRepository.delete(id);

  if (!loan) {
    throw new NotFoundError("Auteur non trouvé");
  }

  return loan;
};
