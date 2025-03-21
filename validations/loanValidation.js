import { BadRequestError, MultipleErrors } from "../errors/customErrors.js";
import { validateDate, validateNumber } from "./commonValidations.js";

export const validateLoan = (loan, partial = false) => {
  if (Object.keys(loan).length === 0) {
    throw new BadRequestError("Aucun contenu à modifier");
  }

  const allowedKeys = [
    "id_emprunt",
    "id_membre",
    "id_exemplaire",
    "id_livre",
    "date_retour_prevue",
  ];
  const requiredKeys = partial
    ? ["id_emprunt"]
    : ["id_membre", "id_exemplaire", "id_livre", "date_retour_prevue"];

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

  ["id_membre", "id_exemplaire", "id_livre"].forEach((field) => {
    if (field in loan) {
      const error = validateNumber(loan[field]);
      if (error) {
        throw new BadRequestError(`Erreur sur ${field}: ${error}`);
      }
    }
  });

  if (!partial) {
    const errors = ["date_retour_prevue"].flatMap((field) =>
      validateDate(loan[field]).map((msg) => `${field}: ${msg}`),
    );
    if (errors.length > 0) throw new MultipleErrors(errors);
  }
};
