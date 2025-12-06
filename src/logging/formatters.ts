import type { LogFormatter, LogEntry } from "@erroriq/logging/types";

export class JsonFormatter implements LogFormatter<Record<string, unknown>> {
  format(entry: LogEntry<unknown>): Record<string, unknown> {
    return {
      level: entry.level,
      message: entry.message,
      error:
        entry.error instanceof Error
          ? { message: entry.error.message, stack: entry.error.stack }
          : entry.error,
      context: entry.context ?? {},
      timestamp: entry.timestamp ?? Date.now(),
    };
  }
}

export class PrettyFormatter implements LogFormatter<string> {
  format(entry: LogEntry<unknown>): string {
    const ts = entry.timestamp ?? Date.now();
    const time = new Date(ts).toISOString();
    const ctx = entry.context ? JSON.stringify(entry.context) : "";
    const err = entry.error instanceof Error ? ` | ${entry.error.message}` : "";
    return `${time} [${entry.level.toUpperCase()}] ${entry.message}${err} ${ctx}`.trim();
  }
}
