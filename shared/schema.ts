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

// Server-side book catalog - prices controlled by server only
export const BOOK_CATALOG: Book[] = [
  {
    id: "death-comes-for-the-archbishop",
    title: "Death Comes for the Archbishop", 
    author: "Willa Cather",
    price: 22.50,
    description: "A classic American novel exploring faith and cultural encounter in the Southwest. From Dr. Hecht's personal collection.",
    isbn: "978-0-679-72889-9",
    year: 1927,
    pages: 297,
    condition: "Excellent",
    availability: "In Stock"
  },
  {
    id: "mans-search-for-meaning",
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl", 
    price: 18.95,
    description: "Frankl's profound meditation on finding purpose through suffering. A cornerstone text in existential psychology.",
    isbn: "978-0-8070-1427-1",
    year: 1946,
    pages: 165,
    condition: "Very Good",
    availability: "In Stock"
  },
  {
    id: "four-quartets",
    title: "Four Quartets",
    author: "T.S. Eliot",
    price: 24.00,
    description: "Eliot's masterpiece of modernist poetry, exploring time, spirituality, and the nature of existence.",
    isbn: "978-0-15-632943-8", 
    year: 1943,
    pages: 48,
    condition: "Fine",
    availability: "In Stock"
  }
];

// Request validation schemas
export const checkoutRequestSchema = z.object({
  bookId: z.string().min(1),
  quantity: z.number().min(1).max(10).default(1),
});

export type CheckoutRequest = z.infer<typeof checkoutRequestSchema>;
