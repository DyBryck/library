import * as authorService from "../services/authorService.js";
import { handleRequest } from "../utils/utils.js";

export const getAllAuthors = async (req, res) =>
  handleRequest(req, res, async () => {
    return await authorService.getAllAuthors();
  });
