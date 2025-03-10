import { authorRoutes } from "./auteurs.js";

export const routeList = [
  // Auteurs
  {
    method: "GET",
    regex: /^\/auteurs$/,
    handler: authorRoutes["GET /auteurs"],
  },
];
