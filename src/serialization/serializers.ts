import { BaseAppError } from "@erroriq/core/BaseAppError";

export const serializeError = (err: unknown) => {
  if (err instanceof BaseAppError) {
    return {
      code: err.code,
      message: err.message,
      metadata: err.metadata ?? {},
      tags: err.tags,
      isTransient: err.isTransient,
    };
  }

  const message = (err && (err as any).message) || String(err);
  return {
    code: "UNKNOWN" as const,
    message,
    metadata: {},
    tags: [],
    isTransient: false,
  };
};
