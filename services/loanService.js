import { NotFoundError } from "../errors/customErrors.js";
import { loanRepository, memberRepository } from "../repositories/index.js";
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

  validateLoan(loan);

  const member = await memberRepository.getByID(body.id_membre);
  if (!member) {
    throw new NotFoundError("Le membre n'existe pas");
  }

  // Si l'exemplaire existe bien, puis si il est disponible

  const loanCreated = await loanRepository.create(loan);
  return loanCreated;
};

export const updateLoan = async (id, body) => {
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
