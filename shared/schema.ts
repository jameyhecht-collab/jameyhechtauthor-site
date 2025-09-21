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

// Dr. Hecht's published works
export const BOOK_CATALOG: Book[] = [
  {
    id: "blooms-homer",
    title: "Bloom's How to Write About Homer",
    author: "Dr. Jamey Hecht",
    price: 18.00,
    description: "A comprehensive guide for students and scholars writing about Homer's epics, covering critical approaches, themes, and analytical frameworks.",
    isbn: "978-1604137163",
    year: 2010,
    condition: "New",
    availability: "In Stock"
  },
  {
    id: "sophocles-theban-plays",
    title: "Sophocles' Three Theban Plays",
    author: "Dr. Jamey Hecht (translator)",
    price: 12.00,
    description: "Translation, notes, and commentary on Sophocles' masterful trilogy. A fresh interpretation of these classical works for contemporary readers.",
    isbn: "978-1840221442",
    year: 2004,
    condition: "New",
    availability: "In Stock"
  },
  {
    id: "platos-symposium",
    title: "Plato's Symposium: Eros and The Human Predicament",
    author: "Dr. Jamey Hecht",
    price: 28.00,
    description: "An in-depth analysis of Plato's philosophical masterpiece, exploring themes of love, beauty, and human nature through scholarly examination.",
    isbn: "978-0805716399",
    year: 1999,
    condition: "New",
    availability: "In Stock"
  },
  {
    id: "dodo-feathers",
    title: "Dodo Feathers: Poems 1989–2019",
    author: "Dr. Jamey Hecht",
    price: 20.00,
    description: "A collection spanning three decades of poetic work, exploring themes of memory, loss, and transformation through elegant verse.",
    isbn: "978-1949093070",
    year: 2019,
    condition: "New",
    availability: "In Stock"
  },
  {
    id: "limousine-midnight-blue",
    title: "Limousine, Midnight Blue: Fifty Frames from the Zapruder Film",
    author: "Dr. Jamey Hecht",
    price: 18.00,
    description: "Fifty 14-line elegies for President John F. Kennedy, exploring themes of political idealism, tragedy, and the American dream through lyrical meditation.",
    isbn: "978-1597091282",
    year: 2009,
    condition: "New",
    availability: "In Stock"
  }
];

// Request validation schemas
export const checkoutRequestSchema = z.object({
  bookId: z.string().min(1),
  quantity: z.number().min(1).max(10).default(1),
});

export type CheckoutRequest = z.infer<typeof checkoutRequestSchema>;
