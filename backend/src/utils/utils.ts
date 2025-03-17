import { IncomingMessage, ServerResponse } from "http";
import { BadRequestError, MultipleErrors, NotFoundError } from "../errors/customErrors.js";
import { appendLog } from "./logger.js";
import { sendResponse } from "./responseUtils.js";

export const parseRequestBody = (req: IncomingMessage): Promise<any> => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      if (!body) return reject({ status: 400, message: "Aucun contenu reçu" });
      try {
        const parsedData = JSON.parse(body);
        resolve(parsedData);
      } catch (err: any) {
        console.error("❌ Erreur JSON:", err.message);
        reject({ status: 400, message: "Format JSON invalide" });
      }
    });
    req.on("error", () => reject({ status: 500, message: "Erreur serveur" }));
  });
};

const defaultSuccessCodes: Record<string, number> = {
  GET: 200,
  POST: 201,
  PUT: 200,
  DELETE: 200,
};

export const handleRequest = async (
  req: IncomingMessage,
  res: ServerResponse,
  callback: (body: any) => Promise<any>,
): Promise<void> => {
  try {
    const body = req.method === "POST" || req.method === "PUT" ? await parseRequestBody(req) : null;
    const data = await callback(body);
    const code = defaultSuccessCodes[req.method ?? "GET"] || 200;
    sendResponse(res, code, data);
  } catch (error: any) {
    appendLog(`Erreur rencontrée: ${error}`);
    if (error.message.includes("UNIQUE constraint failed")) {
      return sendResponse(res, 400, null, "Doublon détecté");
    }

    if (error.message.includes("FOREIGN KEY constraint failed")) {
      return sendResponse(res, 404, null, "Un élément n'existe pas");
    }

    let statusCode: number;
    if (error instanceof NotFoundError) {
      statusCode = 404;
    } else if (error instanceof BadRequestError || error instanceof MultipleErrors) {
      statusCode = 400;
    } else {
      statusCode = 500;
    }

    if (error instanceof MultipleErrors) {
      sendResponse(res, 400, statusCode, { error: error.message, errors: error.errors });
    } else {
      sendResponse(res, statusCode, null, error.message);
    }
  }
};

export const computeReturnDate = () => {
  const now = new Date();
  now.setDate(now.getDate() + 15);

  return now.toISOString().split("T")[0];
};
