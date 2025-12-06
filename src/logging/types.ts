export type LogLevel = "error" | "warn" | "info";

export interface LogEntry<TFormatted = unknown> {
  level: LogLevel;
  message: string;
  error?: unknown;
  context?: Record<string, unknown>;
  timestamp?: number;
  formatted?: TFormatted;
}

export type Transport<TFormatted = unknown> = (
  entry: LogEntry<TFormatted>,
) => void | Promise<void>;

export type LogMiddleware<TFormatted = unknown> = (
  entry: LogEntry<TFormatted>,
  next: (entry: LogEntry<TFormatted>) => void,
) => void;

export interface LogFormatter<T = unknown> {
  format(entry: LogEntry<unknown>): T;
}
