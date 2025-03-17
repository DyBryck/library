import { BadRequestError, MultipleErrors } from "../errors/customErrors.js";
import { validateDate, validateNumber } from "./commonValidations.js";

interface LoanData {
  id_emprunt?: number;
  id_membre?: number;
  id_exemplaire?: number;
  id_livre?: number;
  date_retour_prevue: string;
}

export const validateLoan = (loan: LoanData, partial: boolean = false) => {
  if (Object.keys(loan).length === 0) {
    throw new BadRequestError("Aucun contenu à modifier");
  }

  const allowedKeys: (keyof LoanData)[] = [
    "id_emprunt",
    "id_membre",
    "id_exemplaire",
    "id_livre",
    "date_retour_prevue",
  ];
  const requiredKeys: (keyof LoanData)[] = partial
    ? ["id_emprunt"]
    : ["id_membre", "id_exemplaire", "id_livre", "date_retour_prevue"];

  Object.keys(loan).forEach((key) => {
    if (!allowedKeys.includes(key as keyof LoanData)) {
      throw new BadRequestError(`Clé non autorisée: ${key}`);
    }
  });

  requiredKeys.forEach((key) => {
    if (loan[key] === undefined || loan[key] === null) {
      throw new BadRequestError(`Clé manquante: ${key}`);
    }
  });

  (["id_membre", "id_exemplaire", "id_livre"] as (keyof LoanData)[]).forEach((field) => {
    if (loan[field] !== undefined) {
      const error = validateNumber(loan[field] as number);
      if (error) {
        throw new BadRequestError(`Erreur sur ${field}: ${error}`);
      }
    }
  });

  if (!partial) {
    const dateField: keyof LoanData = "date_retour_prevue";
    const dateValue = loan[dateField];

    const errors: string[] = validateDate(dateValue).map((msg) => `${dateField}: ${msg}`);
    if (errors.length > 0) {
      throw new MultipleErrors(errors);
    }
  }
};
