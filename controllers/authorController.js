import * as authorService from "../services/authorService.js";
import { handleRequest } from "../utils/utils.js";

export const getAllAuthors = async (req, res) =>
  handleRequest(req, res, async () => {
    const authorList = await authorService.getAllAuthors();
    return {
      message: "Liste des auteurs trouvés:",
      authorList: authorList,
    };
  });

export const getAuthorByID = async (req, res, id) => {
  handleRequest(req, res, async () => {
    const authorFound = await authorService.getAuthorByID(id);
    return {
      message: "Auteur trouvé:",
      authorFound: authorFound,
    };
  });
};

export const createAuthor = async (req, res) => {
  handleRequest(req, res, async (body) => {
    const authorCreated = await authorService.createAuthor(body);
    return {
      message: "Auteur crée:",
      authorCreated: authorCreated,
    };
  });
};

export const updateAuthor = async (req, res, id) => {
  handleRequest(req, res, async (body) => {
    const authorUpdated = await authorService.updateAuthor(id, body);
    return {
      message: "Auteur modifié:",
      authorUpdated: authorUpdated,
    };
  });
};

export const deleteAuthor = async (req, res, id) => {
  handleRequest(req, res, async () => {
    const authorDeleted = await authorService.deleteAuthor(id);
    return {
      message: "Auteur supprimé:",
      authorDeleted: authorDeleted,
    };
  });
};
