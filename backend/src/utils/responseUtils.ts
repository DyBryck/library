import { ServerResponse } from "http";

export const sendResponse = (
  res: ServerResponse,
  statusCode: number,
  data: any = null,
  error: string | string[] | Record<string, unknown> | null = null,
) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });

  if (error && typeof error === "object") {
    res.end(JSON.stringify(error));
  } else {
    res.end(JSON.stringify(error ? { error } : data));
  }
};

export const sendError = (res: ServerResponse, statusCode: number, message: string) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: message }));
};
