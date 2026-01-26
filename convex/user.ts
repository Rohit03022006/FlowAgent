
import { v } from "convex/values";
import { mutation } from "./_generated/server";


export const CreateNewUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        imageUrl: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("UserTable")
            .filter((q) => q.eq(q.field("email"), args.email))
            .collect();
        // If not, then create a new user
        if (user?.length === 0) {
            const userData = {
                name: args.name,
                email: args?.email,
                imageUrl: args.imageUrl,
                token: "5000",
                createdAt: Date.now(),
            };
            const result = await ctx.db.insert("UserTable", userData);
            return userData
        }
        return user[0];
    }
})