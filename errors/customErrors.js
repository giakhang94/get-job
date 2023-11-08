import { StatusCodes } from "http-status-codes";

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFOundError";
    this.StatusCodes = StatusCodes.NOT_FOUND;
  }
}
export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.StatusCodes = StatusCodes.BAD_REQUEST;
  }
}
export class UnAuthError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnAuthError";
    this.StatusCodes = StatusCodes.UNAUTHORIZED;
  }
}
export class UnAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnAuthError";
    this.StatusCodes = StatusCodes.FORBIDDEN;
  }
}
