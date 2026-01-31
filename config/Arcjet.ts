import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/next";

const isDev = process.env.NODE_ENV === "development";

export const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  rules: [
    shield({ mode: isDev ? "DRY_RUN" : "LIVE" }),
    detectBot({
      mode: isDev ? "DRY_RUN" : "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    tokenBucket({
      mode: isDev ? "DRY_RUN" : "LIVE",
      refillRate: 5000,
      interval: 30 * 24 * 60 * 60, // Refill every 30 days (1 month)
      capacity: 5000,
    }),
  ],
});