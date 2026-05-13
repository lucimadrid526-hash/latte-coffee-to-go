import { mutation } from "./_generated/server";

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    // Clean up existing data if any (optional for development)
    const existingCategories = await ctx.db.query("categories").collect();
    for (const cat of existingCategories) {
      await ctx.db.delete(cat._id);
    }
    const existingProducts = await ctx.db.query("products").collect();
    for (const prod of existingProducts) {
      await ctx.db.delete(prod._id);
    }

    // Add Categories
    const catEspresso = await ctx.db.insert("categories", { name: "Espresso", order: 1 });
    const catMilk = await ctx.db.insert("categories", { name: "Cappuccino & Latte", order: 2 });
    const catCold = await ctx.db.insert("categories", { name: "Băuturi Reci", order: 3 });

    // Add Products
    await ctx.db.insert("products", {
      name: "Espresso Single",
      categoryId: catEspresso,
      price: 7,
      description: "Scurt, intens și plin de aromă.",
      isAvailable: true,
      imageUrl: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=500"
    });

    await ctx.db.insert("products", {
      name: "Cappuccino Classic",
      categoryId: catMilk,
      price: 12,
      description: "Espresso cu lapte cremos și spumă fină.",
      isAvailable: true,
      imageUrl: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=500"
    });

    await ctx.db.insert("products", {
      name: "Latte Macchiato",
      categoryId: catMilk,
      price: 14,
      description: "Straturi perfecte de lapte și cafea.",
      isAvailable: true,
      imageUrl: "https://images.unsplash.com/photo-1521404176371-d007e997a3f4?q=80&w=500"
    });

    await ctx.db.insert("products", {
      name: "Iced Latte",
      categoryId: catCold,
      price: 15,
      description: "Răcoritor și energizant.",
      isAvailable: true,
      imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=500"
    });

    return "Database seeded successfully!";
  },
});
