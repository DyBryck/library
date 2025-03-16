var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as authorService from "../services/authorService.js";
import { handleRequest } from "../utils/utils.js";
export const getAllAuthors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return handleRequest(req, res, () => __awaiter(void 0, void 0, void 0, function* () {
        const authorList = yield authorService.getAllAuthors();
        return {
            message: "Liste des auteurs trouvés:",
            authorList: authorList,
        };
    }));
});
export const getAuthorByID = (req, res, id) => __awaiter(void 0, void 0, void 0, function* () {
    handleRequest(req, res, () => __awaiter(void 0, void 0, void 0, function* () {
        const authorFound = yield authorService.getAuthorByID(id);
        return {
            message: "Auteur trouvé:",
            authorFound: authorFound,
        };
    }));
});
export const createAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    handleRequest(req, res, (body) => __awaiter(void 0, void 0, void 0, function* () {
        const authorCreated = yield authorService.createAuthor(body);
        return {
            message: "Auteur crée:",
            authorCreated: authorCreated,
        };
    }));
});
export const updateAuthor = (req, res, id) => __awaiter(void 0, void 0, void 0, function* () {
    handleRequest(req, res, (body) => __awaiter(void 0, void 0, void 0, function* () {
        const authorUpdated = yield authorService.updateAuthor(id, body);
        return {
            message: "Auteur modifié:",
            authorUpdated: authorUpdated,
        };
    }));
});
export const deleteAuthor = (req, res, id) => __awaiter(void 0, void 0, void 0, function* () {
    handleRequest(req, res, () => __awaiter(void 0, void 0, void 0, function* () {
        const authorDeleted = yield authorService.deleteAuthor(id);
        return {
            message: "Auteur supprimé:",
            authorDeleted: authorDeleted,
        };
    }));
});
//# sourceMappingURL=authorController.js.map