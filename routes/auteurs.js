import * as authorController from "../controllers/authorController.js";
import { handleAsyncErrors } from "../errors/errorHandler.js";

export const authorRoutes = {
  "GET /auteurs": handleAsyncErrors(authorController.getAllAuthors),
};
