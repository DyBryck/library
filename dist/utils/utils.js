var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BadRequestError, MultipleErrors, NotFoundError } from "../errors/customErrors.js";
import { appendLog } from "./logger.js";
import { sendResponse } from "./responseUtils.js";
export const parseRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
            if (!body)
                return reject({ status: 400, message: "Aucun contenu reçu" });
            try {
                const parsedData = JSON.parse(body);
                resolve(parsedData);
            }
            catch (err) {
                console.error("❌ Erreur JSON:", err.message);
                reject({ status: 400, message: "Format JSON invalide" });
            }
        });
        req.on("error", () => reject({ status: 500, message: "Erreur serveur" }));
    });
};
const defaultSuccessCodes = {
    GET: 200,
    POST: 201,
    PUT: 200,
    DELETE: 200,
};
export const handleRequest = (req, res, callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.method === "POST" || req.method === "PUT" ? yield parseRequestBody(req) : null;
        const data = yield callback(body);
        const code = defaultSuccessCodes[req.method] || 200;
        sendResponse(res, code, data);
    }
    catch (error) {
        appendLog(`Erreur rencontrée: ${error}`);
        if (error.message.includes("UNIQUE constraint failed")) {
            return sendResponse(res, 400, null, "Doublon détecté");
        }
        if (error.message.includes("FOREIGN KEY constraint failed")) {
            return sendResponse(res, 404, null, "Un élément n'existe pas");
        }
        let statusCode;
        if (error instanceof NotFoundError) {
            statusCode = 404;
        }
        else if (error instanceof BadRequestError || error instanceof MultipleErrors) {
            statusCode = 400;
        }
        else {
            statusCode = 500;
        }
        if (error instanceof MultipleErrors) {
            sendResponse(res, 400, statusCode, { error: error.message, errors: error.errors });
        }
        else {
            sendResponse(res, statusCode, null, error.message);
        }
    }
});
export const computeReturnDate = () => {
    const now = new Date();
    now.setDate(now.getDate() + 15);
    return now.toISOString().split("T")[0];
};
//# sourceMappingURL=utils.js.map