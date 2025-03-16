export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
  }
}

export class MultipleErrors extends Error {
  constructor(errors) {
    super("Plusieurs erreurs trouvées");
    this.errors = errors;
  }
}
