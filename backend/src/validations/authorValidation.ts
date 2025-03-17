import { BadRequestError } from "../errors/customErrors.js";
import { validateDate, validateName } from "./commonValidations.js";

interface AuthorData {
  lastName?: string;
  firstName?: string;
  birthDate?: string;
  nationality?: string;
}

export const validateAuthor = (author: AuthorData, partial: boolean = false) => {
  if (Object.keys(author).length === 0) {
    throw new BadRequestError("Aucun contenu à modifier");
  }

  const allowedKeys: (keyof AuthorData)[] = ["lastName", "firstName", "birthDate", "nationality"];
  const requiredKeys: (keyof AuthorData)[] = partial
    ? []
    : ["lastName", "firstName", "birthDate", "nationality"];

  Object.keys(author).forEach((key) => {
    if (!allowedKeys.includes(key as keyof AuthorData)) {
      throw new BadRequestError(`Clé non autorisée: ${key}`);
    }
  });

  requiredKeys.forEach((key) => {
    if (author[key] === undefined || author[key] === null) {
      throw new BadRequestError(`Clé manquante: ${key}`);
    }
  });

  (["lastName", "firstName"] as (keyof AuthorData)[]).forEach((field) => {
    if (author[field] !== undefined) {
      const error = validateName(author[field] as string);
      if (error) {
        throw new BadRequestError(`Erreur sur ${field}: ${error}`);
      }
    }
  });

  if (author.birthDate !== undefined) {
    const dateErrors = validateDate(author.birthDate);
    if (dateErrors.length > 0) {
      throw new BadRequestError(`Erreur sur birthDate: ${dateErrors.join(", ")}`);
    }
  }
};
