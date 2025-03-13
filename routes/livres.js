import * as bookController from "../controllers/bookController.js";
import { handleAsyncErrors } from "../errors/errorHandler.js";

export const bookRoutes = {
  "GET /livres": handleAsyncErrors(bookController.getAllBooks),
  "GET /livres/:id": handleAsyncErrors(bookController.getBookByID),
  "GET /livres/:id/exemplaire": handleAsyncErrors(bookController.getBookCopyByID),
};
