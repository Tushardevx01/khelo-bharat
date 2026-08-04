type LogLevel = "info" | "warn" | "error" | "debug";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
  error?: Error;
}

function formatLogEntry(entry: LogEntry): string {
  const base = `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.message}`;
  if (entry.context) {
    return `${base} ${JSON.stringify(entry.context)}`;
  }
  return base;
}

function createLogger() {
  const timestamp = () => new Date().toISOString();

  return {
    info(message: string, context?: Record<string, unknown>) {
      const entry: LogEntry = { level: "info", message, timestamp: timestamp(), context };
      console.log(formatLogEntry(entry));
    },

    warn(message: string, context?: Record<string, unknown>) {
      const entry: LogEntry = { level: "warn", message, timestamp: timestamp(), context };
      console.warn(formatLogEntry(entry));
    },

    error(message: string, error?: Error, context?: Record<string, unknown>) {
      const entry: LogEntry = { level: "error", message, timestamp: timestamp(), context, error };
      console.error(formatLogEntry(entry));
      if (error?.stack) {
        console.error(error.stack);
      }
    },

    debug(message: string, context?: Record<string, unknown>) {
      if (process.env.NODE_ENV === "development") {
        const entry: LogEntry = { level: "debug", message, timestamp: timestamp(), context };
        console.debug(formatLogEntry(entry));
      }
    },
  };
}

export const logger = createLogger();
