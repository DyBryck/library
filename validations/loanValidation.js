import { BadRequestError, MultipleErrors } from "../errors/customErrors.js";
import { validateDate, validateNumber } from "./commonValidations.js";

export const validateLoan = (loan, partial = false) => {
  if (Object.keys(loan).length === 0) {
    throw new BadRequestError("Aucun contenu à modifier");
  }

  const allowedKeys = ["id_membre", "id_exemplaire", "date_emprunt", "date_retour_prevue"];
  const requiredKeys = partial
    ? []
    : ["id_membre", "id_exemplaire", "date_emprunt", "date_retour_prevue"];

  Object.keys(loan).forEach((key) => {
    if (!allowedKeys.includes(key)) {
      throw new BadRequestError(`Clé non autorisée: ${key}`);
    }
  });

  requiredKeys.forEach((key) => {
    if (!loan[key]) {
      throw new BadRequestError(`Clé manquante: ${key}`);
    }
  });

  ["id_membre", "id_exemplaire"].forEach((field) => {
    if (field in loan) {
      const error = validateNumber(loan[field]);
      if (error) {
        throw new BadRequestError(`Erreur sur ${field}: ${error}`);
      }
    }
  });

  const errors = ["date_emprunt", "date_retour_prevue"].flatMap((field) =>
    validateDate(loan[field]).map((msg) => `${field}: ${msg}`),
  );
  if (errors.length > 0) throw new MultipleErrors(errors);
};
