import type { LogMiddleware } from "@erroriq/logging/types";

export const timestampMiddleware: LogMiddleware = (entry, next) => {
  entry.timestamp = Date.now();
  next(entry);
};

let globalContext: Record<string, unknown> = {};

export const setGlobalContext = (ctx: Record<string, unknown>) => {
  globalContext = { ...globalContext, ...ctx };
};

export const contextMiddleware: LogMiddleware = (entry, next) => {
  entry.context = { ...(globalContext ?? {}), ...(entry.context ?? {}) };
  next(entry);
};

export const redactKeys = (keys: string[]): LogMiddleware => {
  return (entry, next) => {
    if (entry.context) {
      for (const key of keys) {
        if (Object.prototype.hasOwnProperty.call(entry.context, key)) {
          entry.context[key] = "[REDACTED]";
        }
      }
    }
    next(entry);
  };
};
