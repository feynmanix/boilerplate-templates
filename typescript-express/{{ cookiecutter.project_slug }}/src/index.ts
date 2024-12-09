import helmet from "helmet";
import healthRouter from "./routes/health";
import express, { Express, Request, Response, NextFunction } from "express";

const app: Express = express();
const port = parseInt(process.env.PORT || "3000");
const host = process.env.HOST || "localhost";

// Middleware
app.use(helmet());
app.use(express.json());

// Routes
app.use("/health", healthRouter);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);
  res.status(500).json({ error: "Server error" });
});

app.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
