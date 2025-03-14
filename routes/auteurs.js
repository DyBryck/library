import * as authorController from "../controllers/authorController.js";
import { handleAsyncErrors } from "../errors/errorHandler.js";

export const authorRoutes = {
  "GET /auteurs": handleAsyncErrors(authorController.getAllAuthors),
  "GET /auteurs/:id": handleAsyncErrors(authorController.getAuthorByID),
  "POST /auteurs": handleAsyncErrors(authorController.createAuthor),
  "PUT /auteurs/:id": handleAsyncErrors(authorController.updateAuthor),
  "DELETE /auteurs/:id": handleAsyncErrors(authorController.deleteAuthor),
};
