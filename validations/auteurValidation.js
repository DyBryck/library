import { validateName } from "./commonValidations.js";

export function validateAuteur(auteur) {
  const errors = [];

  const nameFields = [
    { key: "lastName", label: "nom" },
    { key: "firstName", label: "prénom" },
  ];

  nameFields.forEach((field) => {
    const error = validateName(auteur[field.key]);
    if (error) {
      errors.push(`Erreur sur le ${field.label}: ${error}`);
    }
  });

  if (auteur.birthDate && isNaN(Date.parse(auteur.birthDate))) {
    errors.push("Date de naissance invalide");
  }

  return errors;
}
