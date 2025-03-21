import * as bookService from "../services/bookService.js";
import { handleRequest } from "../utils/utils.js";

export const getAllBooks = (req, res) => {
  handleRequest(req, res, async () => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const categorie = url.searchParams.get("categorie");
    const auteur = url.searchParams.get("auteur");
    const page = url.searchParams.get("page");
    const limit = url.searchParams.get("limit");

    const bookList = await bookService.getAllBooks({ categorie, auteur, page, limit });

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

export const getFirstAvailableCopyByBookID = (req, res, id) => {
  handleRequest(req, res, async () => {
    const copy = await bookService.getFirstAvailableCopyByBookID(id);
    return {
      message: "Exemplaire trouvé:",
      copies: copy,
    };
  });
};
