import { query } from "./_generated/server";
import { v } from "convex/values";

export const listAll = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("products"),
      _creationTime: v.number(),
      name: v.string(),
      categoryId: v.id("categories"),
      price: v.number(),
      description: v.string(),
      imageUrl: v.optional(v.string()),
      isAvailable: v.boolean(),
    })
  ),
  handler: async (ctx) => {
    return await ctx.db
      .query("products")
      .withIndex("by_availability", (q) => q.eq("isAvailable", true))
      .collect();
  },
});

export const listCategories = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("categories"),
      _creationTime: v.number(),
      name: v.string(),
      order: v.number(),
    })
  ),
  handler: async (ctx) => {
    return await ctx.db.query("categories").order("asc").collect();
  },
});
