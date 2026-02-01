import { query } from "./_generated/server";
import { v } from "convex/values";

export const GetConversationById = query({
  args: {
    userId: v.id("UserTable"),
    agentId: v.id("AgentTable"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("ConversationTable")
      .filter((q) =>
        q.and(
          q.eq(q.field("agentId"), args.agentId),
          q.eq(q.field("userId"), args.userId)
        )
      )
      .collect();

    return result[0];
  },
});
