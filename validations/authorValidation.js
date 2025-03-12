import { BadRequestError } from "../errors/customErrors.js";
import { validateName } from "./commonValidations.js";

export const validateAuthor = (author, { partial = false } = {}) => {
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
    const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
    const match = author.birthDate.match(dateRegex);
    if (!match) {
      throw new BadRequestError("Format de date invalide, attendu YYYY-MM-DD");
    }

    const [, yearStr, monthStr, dayStr] = match;
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);
    const day = parseInt(dayStr, 10);

    if (month < 1 || month > 12) {
      throw new BadRequestError("Mois invalide (1–12)");
    }

    if (day < 1 || day > 31) {
      throw new BadRequestError("Jour invalide (1–31)");
    }

    const parsed = new Date(author.birthDate);
    if (isNaN(parsed.getTime())) {
      throw new BadRequestError("Date de naissance invalide");
    }
  }
};
