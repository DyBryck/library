import * as bookService from "../services/bookService.js";
import { handleRequest } from "../utils/utils.js";

export const getAllBooks = (req, res) => {
  handleRequest(req, res, async () => {
    const bookList = await bookService.getAllBooks();
    return {
      message: "Liste des livres trouvés:",
      bookList: bookList,
    };
  });
};

export const getBookByID = (req, res, id) => {
  handleRequest(req, res, async () => {
    const book = await bookService.getBookByID(id);
    return {
      message: "Livre trouvé:",
      book: book,
    };
  });
};

export const getBookCopyByID = (req, res, id) => {
  handleRequest(req, res, async () => {
    const copy = await bookService.getBookCopyByID(id);
    return {
      message: "Exemplaire trouvé:",
      copies: copy,
    };
  });
};
