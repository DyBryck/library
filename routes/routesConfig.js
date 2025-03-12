import { authorRoutes } from "./auteurs.js";

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
];
