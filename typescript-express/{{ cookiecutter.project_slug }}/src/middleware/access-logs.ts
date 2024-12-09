import { Request } from "express";
import morgan, { StreamOptions } from "morgan";
import { Config } from "../config";

const accessLogsFormat = Config.isDevelopment
  ? ":method :url :status :response-time ms - :res[content-length]" // Morgan's dev format
  : "[:date[iso]] :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms"; // modified Morgan's short format

export function createAccessLogsMiddleware(outputStream: StreamOptions = process.stdout) {
  return morgan(accessLogsFormat, {
    skip: (req: Request) => req.method === "OPTIONS",
    stream: outputStream,
  });
}
