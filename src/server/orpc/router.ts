import { os, ORPCError } from "@orpc/server";
import { z } from "zod";
import { db } from "@/db";
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";

export const todoRouter = os.router({
  // Query: get all todos
  getAll: os.handler(async () => {
    return await db.select().from(todos);
  }),

  // Mutation: add a todo
  add: os
    .input(z.object({ text: z.string().min(1) }))
    .handler(async ({ input }) => {
      const result = await db
        .insert(todos)
        .values({ text: input.text, done: false })
        .returning();
      return result[0];
    }),

  // Mutation: toggle a todo
  toggle: os
    .input(z.object({ id: z.number(), done: z.boolean() }))
    .handler(async ({ input }) => {
      const result = await db
        .update(todos)
        .set({ done: input.done })
        .where(eq(todos.id, input.id))
        .returning();

      if (result.length === 0) {
        throw new ORPCError("NOT_FOUND", { message: "Todo not found" });
      }

      return result[0];
    }),

  // Mutation: remove a todo
  remove: os.input(z.object({ id: z.number() })).handler(async ({ input }) => {
    await db.delete(todos).where(eq(todos.id, input.id));
    return { success: true };
  }),
});

export const router = os.router({
  todo: todoRouter,
});

export type Router = typeof router;
