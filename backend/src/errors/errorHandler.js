import { sendError } from "../utils/responseUtils.js";

export const handleAsyncErrors = (controllerFunction) => {
  return async (req, res, ...args) => {
    try {
      await controllerFunction(req, res, ...args);
    } catch (error) {
      console.error("Erreur capturée :", error);

      if (error.message.includes("FOREIGN KEY constraint failed")) {
        return sendError(
          res,
          400,
          "Erreur de clé étrangère : l'identifiant utilisateur est invalide.",
        );
      }
      if (error.message.includes("UNIQUE constraint failed")) {
        return sendError(res, 409, "Erreur d'unicité : la donnée existe déjà.");
      }

      sendError(res, error.status || 500, error.message || "Erreur serveur");
    }
  };
};
