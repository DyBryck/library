var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { sendError } from "../utils/responseUtils.js";
export const handleAsyncErrors = (controllerFunction) => {
    return (req, res, ...args) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield controllerFunction(req, res, ...args);
        }
        catch (error) {
            console.error("Erreur capturée :", error);
            if (error.message.includes("FOREIGN KEY constraint failed")) {
                return sendError(res, 400, "Erreur de clé étrangère : l'identifiant utilisateur est invalide.");
            }
            if (error.message.includes("UNIQUE constraint failed")) {
                return sendError(res, 409, "Erreur d'unicité : la donnée existe déjà.");
            }
            sendError(res, error.status || 500, error.message || "Erreur serveur");
        }
    });
};
//# sourceMappingURL=errorHandler.js.map