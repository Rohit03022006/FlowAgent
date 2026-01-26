import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/next";

export const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  rules: [
   
    shield({ mode: "LIVE" }),
   
    detectBot({
      mode: "LIVE", 
      allow: [
        "CATEGORY:SEARCH_ENGINE", 
     
      ],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 5000,
      interval: 30*24*60*60*100, // Refill every 1 month
      capacity: 5000, // Bucket capacity of 10 tokens
    }),
  ],
});