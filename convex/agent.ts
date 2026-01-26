import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const CreateAgent = mutation({
    args: {
        name: v.string(),
        userId: v.id("UserTable"),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("AgentTable", {
            name: args.name,
            userId: args.userId,
            published: false,
            nodes: [],
            edges: [],
            createdAt: Date.now(),
        });
    },
});

export const GetUserAgents = query({
    args: {
        userId: v.id("UserTable"),
    },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("AgentTable")
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .order("desc")
            .collect();
    },
});

export const GetAgentById = query({
    args: {
        agentId: v.id("AgentTable"),
    },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.agentId);
    },
});


export const UpdateAgentDetails = mutation({
    args: {
        agentId: v.id("AgentTable"),
        name: v.optional(v.string()),
        nodes: v.optional(v.any()),
        edges: v.optional(v.any()),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.agentId, {
            ...(args.name !== undefined && { name: args.name }),
            ...(args.nodes !== undefined && { nodes: args.nodes }),
            ...(args.edges !== undefined && { edges: args.edges }),
            updatedAt: Date.now(),
        });
    },
});
