import { BadRequestError } from "../errors/customErrors.js";
import { validateDate, validateName } from "./commonValidations.js";

export const validateAuthor = (author, partial = false) => {
  if (Object.keys(author).length === 0) {
    throw new BadRequestError("Aucun contenu à modifier");
  }

  const allowedKeys = ["lastName", "firstName", "birthDate", "nationality"];
  const requiredKeys = partial ? [] : ["lastName", "firstName", "birthDate", "nationality"];

  Object.keys(author).forEach((key) => {
    if (!allowedKeys.includes(key)) {
      throw new BadRequestError(`Clé non autorisée: ${key}`);
    }
  });

  requiredKeys.forEach((key) => {
    if (!author[key]) {
      throw new BadRequestError(`Clé manquante: ${key}`);
    }
  });

  ["lastName", "firstName"].forEach((field) => {
    if (field in author) {
      const error = validateName(author[field]);
      if (error) {
        throw new BadRequestError(`Erreur sur ${field}: ${error}`);
      }
    }
  });

  if ("birthDate" in author) {
    validateDate(author.birthDate);
  }
};
