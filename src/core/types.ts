import { ErrorCode } from "@erroriq/core/errorCodes";

export type ErrorMetadata = Record<string, unknown>;

export interface AppErrorShape {
  code: ErrorCode;
  message: string;
  metadata?: ErrorMetadata;
  originalError?: unknown;
  tags?: string[];
  isTransient?: boolean;
}
