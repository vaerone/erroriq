import { describe, it, expect, beforeEach } from "vitest";
import { ErrorFactory } from "@erroriq/factory/ErrorFactory";
import { serializeError } from "@erroriq/serialization/serializers";
import {
  addTransport,
  clearTransports,
  logError,
} from "@erroriq/logging/logger";

describe("Error framework basic", () => {
  beforeEach(() => clearTransports());

  it("creates an error with metadata", () => {
    const e = ErrorFactory.validation("Bad email", { field: "email" });
    expect(e.message).toBe("Bad email");
    expect(e.code).toBe("VALIDATION_ERROR");
    expect(e.metadata?.["field"]).toBe("email");
  });

  it("serializeError formats BaseAppError", () => {
    const e = ErrorFactory.network("Network fail", { requestId: "r1" });
    const s = serializeError(e);
    expect(s.code).toBe("NETWORK_ERROR");
    expect(s.message).toBe("Network fail");
    expect((s as any).metadata.requestId).toBe("r1");
  });

  it("transports receive log entries", async () => {
    let called = false;
    addTransport(() => {
      called = true;
    });

    const e = ErrorFactory.unknown("boom");
    logError(e);
    await Promise.resolve();
    expect(called).toBe(true);
  });
});
