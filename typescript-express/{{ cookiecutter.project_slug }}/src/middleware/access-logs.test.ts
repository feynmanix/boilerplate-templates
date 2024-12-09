import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import express from "express";
import { createAccessLogsMiddleware } from "./access-logs";
import { Writable } from "stream";

describe("Access Logs Middleware", () => {
  let app: express.Application;
  let logs: string[];

  beforeEach(() => {
    app = express();
    logs = [];

    const testStream = new Writable({
      write(chunk, encoding, callback) {
        logs.push(chunk.toString());
        callback();
      },
    });

    app.use(createAccessLogsMiddleware(testStream));
    app.get("/test", (_req, res) => {
      res.send("pong");
    });
  });

  it("should log HTTP requests", async () => {
    await request(app).get("/test").expect(200);

    expect(logs.length).toBe(1);
    expect(logs[0]).toMatch(/GET \/test (HTTP[^ ]+) 200/);
  });

  it("should skip logging OPTIONS requests", async () => {
    await request(app).options("/test").expect(200);

    expect(logs.length).toBe(0);
  });

  it("should include response time in logs", async () => {
    await request(app).get("/test").expect(200);

    expect(logs[0]).toMatch(/\d+ ms/);
  });
});
