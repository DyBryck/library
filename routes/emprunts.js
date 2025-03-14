import * as loanController from "../controllers/loanController.js";
import { handleAsyncErrors } from "../errors/errorHandler.js";

export const loanRoutes = {
  "GET /emprunts": handleAsyncErrors(loanController.getAllLoans),
  "GET /emprunts/:id": handleAsyncErrors(loanController.getLoanByID),
  "POST /emprunts": handleAsyncErrors(loanController.createLoan),
  "PUT /emprunts": handleAsyncErrors(loanController.updateLoan),
  "DELETE /emprunts/:id": handleAsyncErrors(loanController.deleteLoan),
};
