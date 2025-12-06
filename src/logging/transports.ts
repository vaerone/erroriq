import type { Transport } from "@erroriq/logging/types";
import { logFallback } from "@erroriq/logging/fallback";

export const consoleTransport: Transport = (entry) => {
  const { formatted, level, message, error, context, timestamp } = entry;

  const prefix = `[${level}] @vaerone/erroriq`;

  if (formatted !== undefined) {
    if (typeof formatted === "string") {
      console.log(prefix, formatted);
      return;
    }

    try {
      console.log(prefix, formatted);
      return;
    } catch (err) {
      logFallback(prefix, entry, err);
      return;
    }
  }

  const fn = level === "error" ? "error" : level === "warn" ? "warn" : "log";

  if (error instanceof Error) {
    console[fn](prefix, message, { context, stack: error.stack, timestamp });
  } else {
    console[fn](prefix, message, { context, error, timestamp });
  }
};
