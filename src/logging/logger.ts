import type {
  LogEntry,
  LogLevel,
  Transport,
  LogMiddleware,
  LogFormatter,
} from "@erroriq/logging/types";
import { logFallback } from "@erroriq/logging/fallback";

export class Logger<TFormatted = unknown> {
  private middlewares: LogMiddleware<TFormatted>[] = [];
  private transports: Transport<TFormatted>[] = [];
  private formatter?: LogFormatter<TFormatted>;

  use(mw: LogMiddleware<TFormatted>) {
    this.middlewares.push(mw);
  }

  addTransport(t: Transport<TFormatted>) {
    this.transports.push(t);
  }

  setFormatter(formatter: LogFormatter<TFormatted>) {
    this.formatter = formatter;
  }

  log(
    level: LogLevel,
    message: string,
    error?: unknown,
    context?: Record<string, unknown>,
  ) {
    const entry: LogEntry<TFormatted> = {
      level,
      message,
      error,
      context,
    };

    let index = -1;

    const run = (currentEntry: LogEntry<TFormatted>) => {
      index++;

      if (index < this.middlewares.length) {
        try {
          this.middlewares[index](currentEntry, run);
        } catch (err) {
          // Middleware should not break the logging system
          logFallback(`[${currentEntry.level}] @erroriq`, currentEntry, err);

          // Continue the chain anyway
          run(currentEntry);
        }
      } else {
        this.dispatch(currentEntry);
      }
    };

    run(entry);
  }

  private dispatch(entry: LogEntry<TFormatted>) {
    // Format if a formatter is configured
    const finalEntry: LogEntry<TFormatted> = this.formatter
      ? {
          ...entry,
          formatted: this.formatter.format(entry as LogEntry<unknown>),
        }
      : entry;

    for (const transport of this.transports) {
      try {
        transport(finalEntry);
      } catch (err) {
        // If a transport fails, use the fallback logger
        logFallback(`[${finalEntry.level}] @erroriq`, finalEntry, err);
      }
    }
  }

  error(
    error: unknown,
    message = "Unhandled error",
    context?: Record<string, unknown>,
  ) {
    this.log("error", message, error, context);
  }

  warn(message: string, context?: Record<string, unknown>) {
    this.log("warn", message, undefined, context);
  }

  info(message: string, context?: Record<string, unknown>) {
    this.log("info", message, undefined, context);
  }
}
