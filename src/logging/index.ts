import { Logger } from "@erroriq/logging/logger";

export const logger = new Logger<unknown>();

export * from "@erroriq/logging/types";
export * from "@erroriq/logging/middlewares";
export * from "@erroriq/logging/formatters";
export * from "@erroriq/logging/transports";
export * from "@erroriq/logging/fallback";
export * from "@erroriq/logging/logger";
export * from "@erroriq/logging/env";
