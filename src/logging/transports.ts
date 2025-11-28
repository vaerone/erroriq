import type { Transport } from "@erroriq/logging/logger";

export const consoleTransport: Transport = (entry) => {
  const { level, message, error, context } = entry;
  const prefix = `[${level}] @app/error-framework`;

  if (error instanceof Error) {
    console.error(prefix, message, { context, stack: error.stack });
  } else {
    console[level === "error" ? "error" : level === "warn" ? "warn" : "log"](
      prefix,
      message,
      { context, error },
    );
  }
};
