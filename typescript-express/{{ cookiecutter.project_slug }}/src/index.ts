import helmet from "helmet";
import healthRouter from "./routes/health";
import express, { Express, NextFunction, Request, Response } from "express";
import { Config } from "./config";
import { createAccessLogsMiddleware } from "./middleware/access-logs";
import { logger } from "./utils/logging";
import { makeErrorHandlerMiddleware } from "./middleware/error";

const app: Express = express();

// Middleware
app.use(createAccessLogsMiddleware());
app.use(helmet());
app.use(express.json({ limit: "500kb" }));

// Routes
app.use("/health", healthRouter);

// Error handling middleware at the end
app.use(makeErrorHandlerMiddleware());

app.listen(Config.port, Config.host, () => {
  logger.info(`Server is running at http://${Config.host}:${Config.port}`);
});
