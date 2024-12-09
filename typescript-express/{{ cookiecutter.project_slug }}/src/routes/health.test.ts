import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import healthRouter from "./health";

describe("API Routes", () => {
  const app = express();
  app.use("/health", healthRouter);

  it("GET /health should return status message", async () => {
    const response = await request(app).get("/health").expect("Content-Type", /json/).expect(200);

    expect(response.body).toEqual({
      status: "OK",
    });
  });
});
