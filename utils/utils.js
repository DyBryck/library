import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import { sendResponse } from "./responseUtils.js";

export const parseRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      if (!body) return reject({ status: 400, message: "Aucun contenu reçu" });
      try {
        const parsedData = JSON.parse(body);
        resolve(parsedData);
      } catch (err) {
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

export const handleRequest = async (req, res, callback) => {
  try {
    const body = req.method === "POST" || req.method === "PUT" ? await parseRequestBody(req) : null;
    const data = await callback(body);
    const code = defaultSuccessCodes[req.method] || 200;
    sendResponse(res, code, data);
  } catch (error) {
    if (error.message.includes("UNIQUE constraint failed")) {
      return sendResponse(res, 400, null, "Doublon détecté");
    }

    let statusCode;
    if (error instanceof NotFoundError) {
      statusCode = 404;
    } else if (error instanceof BadRequestError) {
      statusCode = 400;
    } else {
      statusCode = 500;
    }
    sendResponse(res, statusCode, null, error.message);
  }
};
