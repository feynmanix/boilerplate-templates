import { createLogger, format, Logger, transports } from "winston";
import { Config } from "../config";
import jsonStringify from "safe-stable-stringify";

const sensitiveKeys: Set<string | number | Symbol> = new Set(
  [
    // Extend as needed:
    "x-api-key",
    "authorization",
    "password",
  ].map((key) => key.toLowerCase())
);

export function removeSensitiveData(value: any): any {
  if (Array.isArray(value)) {
    return value.map(removeSensitiveData);
  }
  if (typeof value === "object" && value !== null) {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => !sensitiveKeys.has(String(key).toLowerCase()))
        .map(([key, val]) => [key, removeSensitiveData(val)])
    );
  }
  return value;
}

const format_fn = format.printf((info) => {
  const { level, message, splat, timestamp, ...rest } = info;
  const stringifiedRest = jsonStringify(rest);

  const padding = (info.padding && (info.padding as Record<string, string>)[info.level]) || "";
  if (stringifiedRest !== "{}") {
    return `[${timestamp}] ${info.level}:${padding} ${info.message} ${stringifiedRest}`;
  } else {
    return `[${timestamp}] ${info.level}:${padding} ${info.message}`;
  }
});

const defaultFormat = format.combine(
  ...(Config.isDevelopment ? [format.colorize()] : []),
  format.timestamp(),
  format.errors({ stack: true }),
  // This is needed because people accidentally pass secrets in the message,
  // e.g., passing raw AxiosErrors for requests with credentials would result in logging
  // the credentials. Update sensitiveKeys as needed.
  format((info) => removeSensitiveData(info))(),
  format_fn
);

const consoleTransport = new transports.Console({ format: defaultFormat });

// The Omit is a fix for https://github.com/winstonjs/winston/issues/2280
export const logger: Omit<Logger, "warning"> = createLogger({
  level: Config.logLevel,
  defaultMeta: {},
  transports: [consoleTransport],
  exceptionHandlers: [consoleTransport],
  rejectionHandlers: [consoleTransport],
});

export const _testExports = {
  defaultFormat,
};
