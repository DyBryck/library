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
import { authorRepository } from "../repositories/index.js";
import { validateAuthor } from "../validations/authorValidation.js";
export const getAllAuthors = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield authorRepository.getAll();
});
export const getAuthorByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const author = yield authorRepository.getByID(id);
    if (!author) {
        throw new NotFoundError("Auteur non trouvé");
    }
    return author;
});
export const createAuthor = (body) => __awaiter(void 0, void 0, void 0, function* () {
    validateAuthor(body);
    const author = yield authorRepository.create(body);
    return author;
});
export const updateAuthor = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    validateAuthor(body, { partial: true });
    const author = yield authorRepository.update(id, body);
    if (!author) {
        throw new NotFoundError("Auteur non trouvé");
    }
    return author;
});
export const deleteAuthor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const author = yield authorRepository.delete(id);
    if (!author) {
        throw new NotFoundError("Auteur non trouvé");
    }
    return author;
});
//# sourceMappingURL=authorService.js.map