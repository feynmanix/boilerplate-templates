
export const Config = {
  port: parseInt(process.env.PORT || "3000"),
  host: process.env.HOST || "localhost",
  isDevelopment: process.env.NODE_ENV === "development",
  logLevel: process.env.LOG_LEVEL || "info",
}