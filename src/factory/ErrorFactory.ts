import { BaseAppError } from "@erroriq/core/BaseAppError";
import { ErrorCode } from "@erroriq/core/errorCodes";
import { ErrorMetadata } from "@erroriq/core/types";

export const createError = (
  code: ErrorCode,
  message: string,
  metadata?: ErrorMetadata,
  originalError?: unknown,
  options?: { tags?: string[]; isTransient?: boolean },
) =>
  new BaseAppError({
    code,
    message,
    metadata,
    originalError,
    tags: options?.tags ?? [],
    isTransient: !!options?.isTransient,
  });

export const ErrorFactory = {
  custom: createError,

  network(msg = "Network failure", meta?: ErrorMetadata, err?: unknown) {
    return createError("NETWORK_ERROR", msg, meta, err, { isTransient: true });
  },

  validation(msg = "Invalid input", meta?: ErrorMetadata, err?: unknown) {
    return createError("VALIDATION_ERROR", msg, meta, err);
  },

  auth(msg = "Unauthorized", meta?: ErrorMetadata, err?: unknown) {
    return createError("AUTH_ERROR", msg, meta, err);
  },

  notFound(msg = "Not found", meta?: ErrorMetadata, err?: unknown) {
    return createError("NOT_FOUND", msg, meta, err);
  },

  permission(msg = "Permission denied", meta?: ErrorMetadata, err?: unknown) {
    return createError("PERMISSION_DENIED", msg, meta, err);
  },

  rateLimit(msg = "Rate limit exceeded", meta?: ErrorMetadata, err?: unknown) {
    return createError("RATE_LIMIT", msg, meta, err, { isTransient: true });
  },

  unknown(msg = "Unknown error", meta?: ErrorMetadata, err?: unknown) {
    return createError("UNKNOWN", msg, meta, err);
  },
};
