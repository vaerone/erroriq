export const isProd = () =>
  process.env.NODE_ENV === "production" || process.env.ENV === "production";

export const isDev = () => !isProd();
