export const sendResponse = (res, statusCode, data = null, error = null) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });

  if (error && typeof error === "object") {
    res.end(JSON.stringify(error));
  } else {
    res.end(JSON.stringify(error ? { error } : data));
  }
};

export const sendError = (res, statusCode, message) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: message }));
};
