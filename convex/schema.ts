import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  categories: defineTable({
    name: v.string(),
    order: v.number(),
  }),
  products: defineTable({
    name: v.string(),
    categoryId: v.id("categories"),
    price: v.number(),
    description: v.string(),
    imageUrl: v.optional(v.string()),
    isAvailable: v.boolean(),
  })
    .index("by_category", ["categoryId"])
    .index("by_availability", ["isAvailable"]),
  orders: defineTable({
    customerName: v.string(),
    customerPhone: v.string(),
    items: v.array(
      v.object({
        productId: v.id("products"),
        quantity: v.number(),
        name: v.string(),
        price: v.number(),
      })
    ),
    totalPrice: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("preparing"),
      v.literal("ready"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
  }),
});
