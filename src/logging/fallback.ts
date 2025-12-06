import { safeStringify } from "@erroriq/utils/safeStringify";
import type { LogEntry } from "@erroriq/logging/types";

export const logFallback = (
  prefix: string,
  entry: LogEntry<unknown>,
  reason?: unknown,
) => {
  if (reason) {
    // eslint-disable-next-line no-console
    console.warn(
      `${prefix} [@vaerone/erroriq] Failed to print formatted output:`,
      reason,
    );
  }

  // Fallback: always prints a safe JSON representation
  try {
    // eslint-disable-next-line no-console
    console.log(prefix, safeStringify(entry));
  } catch {
    // Final fallback — for bizarre cases where even safeStringify fails
    // eslint-disable-next-line no-console
    console.log(prefix, {
      level: entry.level,
      message: entry.message,
      error: entry.error instanceof Error ? entry.error.message : entry.error,
      context: entry.context,
      timestamp: entry.timestamp,
    });
  }
};
