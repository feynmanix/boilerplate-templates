import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Writable } from "stream";
import { _testExports, logger, removeSensitiveData } from "./logging";
import { transports } from "winston";
import * as Transport from 'winston-transport';

describe("Logging", () => {
  let output: string;
  let streamTransport: Transport;

  beforeEach(() => {
    output = "";
    const stream = new Writable({
      write(chunk, _encoding, callback) {
        output += chunk.toString();
        callback();
      },
    });

    streamTransport = new transports.Stream({ stream, format: _testExports.defaultFormat });
    logger.add(streamTransport);
  });

  afterEach(() => {
    logger.remove(streamTransport);
  });

  it("should filter out sensitive data from logs", () => {
    const sensitiveData = "super-secret-api-key";
    const normalData = "normal message";

    logger.error("Test message", {
      message: normalData,
      "x-api-key": sensitiveData,
    });

    expect(output).toContain(normalData);
    expect(output).not.toContain(sensitiveData);
  });

  it("should filter sensitive data from nested objects", () => {
    const sensitiveData = "secret-password";
    const normalData = "user data";

    logger.info("Test nested", {
      user: {
        data: normalData,
        password: sensitiveData
      }
    });

    expect(output).toContain(normalData);
    expect(output).not.toContain(sensitiveData);
  });

  describe("removeSensitiveData", () => {
    it("should handle arrays", () => {
      const input = [
        { password: "secret" },
        { data: "keep-me" }
      ];
      const result = removeSensitiveData(input);
      
      expect(result).toEqual([
        {},
        { data: "keep-me" }
      ]);
    });

    it("should handle nested objects", () => {
      const input = {
        user: {
          name: "test",
          password: "secret",
          meta: {
            "x-api-key": "hidden"
          }
        },
        data: "keep-me"
      };
      const result = removeSensitiveData(input);

      expect(result).toEqual({
        user: {
          name: "test",
          meta: {}
        },
        data: "keep-me"
      });
    });

    it("should handle non-object values", () => {
      expect(removeSensitiveData("string")).toBe("string");
      expect(removeSensitiveData(123)).toBe(123);
      expect(removeSensitiveData(null)).toBe(null);
    });
  });
});
