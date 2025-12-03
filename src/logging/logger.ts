import { BaseAppError } from "@erroriq/core/BaseAppError";

export type LogLevel = "error" | "warn" | "info";

export type LogEntry = {
  level: LogLevel;
  message: string;
  error?: unknown;
  context?: Record<string, unknown>;
};

export type Transport = (entry: LogEntry) => void;

let transports: Transport[] = [];

export const addTransport = (transport: Transport) => {
  transports.push(transport);
};

export const clearTransports = () => {
  transports = [];
};

export const log = (
  level: LogLevel,
  message: string,
  error?: unknown,
  context?: Record<string, unknown>,
) => {
  const entry: LogEntry = { level, message, error, context };
  transports.forEach((t) => {
    try {
      t(entry);
    } catch (e) {
      // avoid crashing the host app if a transport fails
      // fallback to console
      // eslint-disable-next-line no-console
      console.error(`[${level}] @vaerone/erroriq transport threw`, e);
    }
  });
};

export const logError = (
  error: unknown,
  message = "Unhandled error",
  context?: Record<string, unknown>,
) => log("error", message, error, context);

export const info = (message: string, context?: Record<string, unknown>) =>
  log("info", message, undefined, context);
export const warn = (message: string, context?: Record<string, unknown>) =>
  log("warn", message, undefined, context);
