import { AppErrorShape } from "@erroriq/core/types";

export class BaseAppError extends Error {
  public readonly code: AppErrorShape["code"];
  public readonly metadata?: AppErrorShape["metadata"];
  public readonly originalError?: AppErrorShape["originalError"];
  public readonly tags: string[];
  public readonly isTransient: boolean;

  constructor({
    code,
    message,
    metadata,
    originalError,
    tags = [],
    isTransient = false,
  }: AppErrorShape) {
    super(message);
    this.name = "BaseAppError";
    this.code = code;
    this.metadata = metadata;
    this.originalError = originalError;
    this.tags = tags;
    this.isTransient = Boolean(isTransient);

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace?.(this, this.constructor);
  }

  toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      metadata: this.metadata,
      tags: this.tags,
      isTransient: this.isTransient,
    };
  }
}
