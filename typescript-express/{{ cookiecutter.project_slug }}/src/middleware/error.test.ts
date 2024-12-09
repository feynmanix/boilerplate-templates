import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import express from "express";
import { makeErrorHandlerMiddleware } from "./error";
import { Writable } from "stream";
import { createLogger, Logger, transports } from "winston";
import { _testExports } from "../utils/logging";
import { AssertionError } from "node:assert";

describe("Error Handler Middleware", () => {
  let app: express.Application;
  let logs: "";
  let testLogger: Logger;

  beforeEach(() => {
    app = express();
    logs = "";

    const stream = new Writable({
      write(chunk, _encoding, callback) {
        logs += chunk.toString();
        callback();
      },
    });

    const streamTransport = new transports.Stream({ stream, format: _testExports.defaultFormat });

    testLogger = createLogger({
      level: "info",
      defaultMeta: {},
      transports: [streamTransport],
    });
  });

  it("should return 500 status code without error message", async () => {
    app.use((req, _res, next) => {
      next(new Error("test error"));
    });
    app.use(makeErrorHandlerMiddleware(testLogger));

    const response = await request(app).get("/test").expect(500);
    expect(response.text).toBe("Internal Server Error");
  });

  it("should handle Error objects", async () => {
    app.use((req, _res, next) => {
      next(new Error("test error"));
    });
    app.use(makeErrorHandlerMiddleware(testLogger));

    await request(app).get("/test").expect(500);

    expect(logs).toContain("Uncaught exception in request GET /test: Error: test error");
  });

  it("should handle non-Error objects", async () => {
    app.use((req, _res, next) => {
      next("custom error");
    });
    app.use(makeErrorHandlerMiddleware(testLogger));

    await request(app).get("/test").expect(500);

    expect(logs).toContain("Uncaught error in request GET /test: custom error");
  });

  it("should remove sensitive information from errors", async () => {
    app.use((req, _res, next) => {
      next(new AssertionError({ message: "test error", actual: { username: "john", password: "123456" } }));
    });
    app.use(makeErrorHandlerMiddleware(testLogger));

    await request(app).get("/test").expect(500);

    expect(logs).toContain("Uncaught exception in request GET /test: AssertionError");
    expect(logs).not.toContain("123456");
  });
});
