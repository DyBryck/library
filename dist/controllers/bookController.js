var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as bookService from "../services/bookService.js";
import { handleRequest } from "../utils/utils.js";
export const getAllBooks = (req, res) => {
    handleRequest(req, res, () => __awaiter(void 0, void 0, void 0, function* () {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const categorie = url.searchParams.get("categorie");
        const auteur = url.searchParams.get("auteur");
        const page = url.searchParams.get("page");
        const limit = url.searchParams.get("limit");
        const bookList = yield bookService.getAllBooks({ categorie, auteur, page, limit });
        return {
            message: "Liste des livres trouvés:",
            bookList: bookList,
        };
    }));
};
export const getBookByID = (req, res, id) => {
    handleRequest(req, res, () => __awaiter(void 0, void 0, void 0, function* () {
        const book = yield bookService.getBookByID(id);
        return {
            message: "Livre trouvé:",
            book: book,
        };
    }));
};
export const getFirstAvailableCopyByBookID = (req, res, id) => {
    handleRequest(req, res, () => __awaiter(void 0, void 0, void 0, function* () {
        const copy = yield bookService.getFirstAvailableCopyByBookID(id);
        return {
            message: "Exemplaire trouvé:",
            copies: copy,
        };
    }));
};
//# sourceMappingURL=bookController.js.map