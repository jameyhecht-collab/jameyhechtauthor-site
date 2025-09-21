import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Dr. Hecht's book catalog with server-controlled pricing
export const bookSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  price: z.number(),
  description: z.string(),
  isbn: z.string().optional(),
  year: z.number().optional(),
  pages: z.number().optional(),
  condition: z.string(),
  availability: z.string(),
});

export type Book = z.infer<typeof bookSchema>;

// Dr. Hecht's published works - awaiting details from author
export const BOOK_CATALOG: Book[] = [
  // Placeholder - will be updated with Dr. Hecht's actual published books
  // Temporarily empty until author provides book details
];

// Request validation schemas
export const checkoutRequestSchema = z.object({
  bookId: z.string().min(1),
  quantity: z.number().min(1).max(10).default(1),
});

export type CheckoutRequest = z.infer<typeof checkoutRequestSchema>;
