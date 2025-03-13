import { authorRoutes } from "./auteurs.js";
import { loanRoutes } from "./emprunts.js";

export const routeList = [
  // Auteurs
  {
    method: "GET",
    regex: /^\/auteurs$/,
    handler: authorRoutes["GET /auteurs"],
  },
  {
    method: "GET",
    regex: /^\/auteurs\/(\d+)$/,
    handler: authorRoutes["GET /auteurs/:id"],
  },
  {
    method: "POST",
    regex: /^\/auteurs$/,
    handler: authorRoutes["POST /auteurs"],
  },
  {
    method: "PUT",
    regex: /^\/auteurs\/(\d+)$/,
    handler: authorRoutes["PUT /auteurs/:id"],
  },
  {
    method: "DELETE",
    regex: /^\/auteurs\/(\d+)$/,
    handler: authorRoutes["DELETE /auteurs/:id"],
  },

  // Emprunts
  {
    method: "GET",
    regex: /^\/emprunts$/,
    handler: loanRoutes["GET /emprunts"],
  },
  {
    method: "GET",
    regex: /^\/emprunts\/(\d+)$/,
    handler: loanRoutes["GET /emprunts/:id"],
  },
  {
    method: "POST",
    regex: /^\/emprunts$/,
    handler: loanRoutes["POST /emprunts"],
  },
];
