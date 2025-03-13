import * as loanService from "../services/loanService.js";
import { handleRequest } from "../utils/utils.js";

export const getAllLoans = async (req, res) => {
  handleRequest(req, res, async () => {
    const loanList = await loanService.getAllLoans();
    return {
      message: "Liste des emprunts trouvé:",
      loanList: loanList,
    };
  });
};

export const getLoanByID = async (req, res, id) => {
  handleRequest(req, res, async () => {
    const loan = await loanService.getLoanByID(id);
    return {
      message: "Emprunt trouvé:",
      loan: loan,
    };
  });
};

export const createLoan = async (req, res) => {
  handleRequest(req, res, async (body) => {
    const loan = await loanService.createLoan(body);
    return {
      message: "Emprunt crée:",
      loan: loan,
    };
  });
};
