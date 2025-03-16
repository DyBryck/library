var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { NotFoundError } from "../errors/customErrors.js";
import { bookRepository, loanRepository, memberRepository } from "../repositories/index.js";
import { computeReturnDate } from "../utils/utils.js";
import { validateLoan } from "../validations/loanValidation.js";
export const getAllLoans = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield loanRepository.getAll();
});
export const getLoanByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const loan = yield loanRepository.getByID(id);
    if (!loan) {
        throw new NotFoundError("Emprunt non trouvé");
    }
    return loan;
});
export const createLoan = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const loan = Object.assign(Object.assign({}, body), { date_retour_prevue: computeReturnDate() });
    validateLoan(loan);
    const member = yield memberRepository.getByID(body.id_membre);
    if (!member) {
        throw new NotFoundError("Le membre n'existe pas");
    }
    const book = yield bookRepository.getByID(body.id_livre);
    if (!book) {
        throw new NotFoundError("Le livre n'existe pas");
    }
    const copy = yield bookRepository.getFirstAvailableCopyByID(body.id_livre);
    if (!copy) {
        throw new NotFoundError("Exemplaire non disponible / introuvable");
    }
    const finalLoan = Object.assign(Object.assign({}, loan), { id_exemplaire: copy.id_exemplaire });
    const loanCreated = yield loanRepository.create(finalLoan);
    return loanCreated;
});
export const updateLoan = (body) => __awaiter(void 0, void 0, void 0, function* () {
    validateLoan(body, true);
    const loan = yield loanRepository.getByID(body.id_emprunt);
    if (!loan) {
        throw new NotFoundError("Emprunt non trouvé");
    }
    const date = new Date();
    const dateFormated = date.toISOString().split("T")[0];
    const newLoan = Object.assign(Object.assign({}, loan), { date_retour_effective: dateFormated });
    const loanUpdated = yield loanRepository.update(newLoan);
    if (!loanUpdated) {
        throw new NotFoundError("Emprunt mis à jour non trouvé");
    }
    return loanUpdated;
});
export const deleteLoan = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const loan = yield loanRepository.delete(id);
    if (!loan) {
        throw new NotFoundError("Emprunt non trouvé");
    }
    return loan;
});
//# sourceMappingURL=loanService.js.map