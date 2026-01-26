import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  UserTable: defineTable({
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    subscription: v.optional(v.string()),
    token: v.string(),
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  AgentTable: defineTable({
    name: v.string(),
    config: v.optional(v.any()),
    nodes: v.optional(v.any()),
    edges: v.optional(v.any()),
    published: v.boolean(),
    userId: v.id("UserTable"),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  })
    .index("by_user", ["userId"]),
});
