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
import { bookRepository } from "../repositories/index.js";
export const getAllBooks = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (filter = {}) {
    return yield bookRepository.getAll(filter);
});
export const getBookByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bookRepository.getByID(id);
});
export const getFirstAvailableCopyByBookID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const copy = yield bookRepository.getFirstAvailableCopyByID(id);
    if (!copy) {
        throw new NotFoundError("Exemplaire indisponible / introuvable");
    }
    return copy;
});
//# sourceMappingURL=bookService.js.map