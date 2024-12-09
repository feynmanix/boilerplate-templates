import { ErrorRequestHandler, Request } from "express";
import { Logger } from "winston";
import { logger, removeSensitiveData } from "../utils/logging";

export const makeErrorHandlerMiddleware = (errorLogger: Omit<Logger, "warning"> = logger): ErrorRequestHandler => {
  return (err, req: Request, res, _next) => {
    if (err instanceof Error) {
      errorLogger.error(`Uncaught exception in request ${req.method} ${req.baseUrl + req.path}: ${err.stack || err.toString()}`);
    } else {
      errorLogger.error(`Uncaught error in request ${req.method} ${req.baseUrl + req.path}: ${removeSensitiveData(err)}`);
    }
    res.status(500).send("Internal Server Error");
  };
}