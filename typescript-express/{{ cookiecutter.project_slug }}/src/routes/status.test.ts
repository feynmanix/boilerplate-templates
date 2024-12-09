import { describe, test, expect } from "vitest";
import request from "supertest";
import express from "express";
import statusRouter from "./status";

describe("API Routes", () => {
  const app = express();
  app.use("/status", statusRouter);

  test("GET /status should return status message", async () => {
    const response = await request(app).get("/status").expect("Content-Type", /json/).expect(200);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "OK",
    });
  });
});
