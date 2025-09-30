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
  coverImage: z.string().optional(),
});

export type Book = z.infer<typeof bookSchema>;

// Dr. Hecht's published works
export const BOOK_CATALOG: Book[] = [
  {
    id: "limousine-midnight-blue",
    title: "Limousine, Midnight Blue: Fifty Frames from the Zapruder Film",
    author: "Dr. Jamey Hecht",
    price: 18.00,
    description: "Fifty 14-line elegies for President John F. Kennedy, exploring themes of political idealism, tragedy, and the American dream through lyrical meditation.",
    isbn: "978-1597091282",
    year: 2009,
    pages: 128,
    condition: "New",
    availability: "In Stock",
    coverImage: "/attached_assets/LIMO-whole-front-cover_1759199924818.jpg"
  },
  {
    id: "blooms-homer",
    title: "Bloom's How to Write About Homer",
    author: "Dr. Jamey Hecht",
    price: 24.00,
    description: "A guide for students and scholars writing about Homer's Iliad and Odyssey, covering critical approaches, themes, and analytical frameworks, with essay prompts and writing guides.",
    isbn: "978-1604137163",
    year: 2010,
    pages: 256,
    condition: "New",
    availability: "In Stock",
    coverImage: "/attached_assets/415TFLsNKyL._AC_CR0,0,0,0_SX960_SY720__1759200114492.jpg"
  },
  {
    id: "sophocles-theban-plays",
    title: "Sophocles' Three Theban Plays",
    author: "Dr. Jamey Hecht (translator)",
    price: 14.00,
    description: "A blank verse translation with notes and commentary, and an introduction analyzing Antigone, Oedipus the Tyrant, and Oedipus at Colonus.",
    isbn: "978-1840221442",
    year: 2004,
    pages: 180,
    condition: "New",
    availability: "In Stock",
    coverImage: "/attached_assets/81c8o6shAyL._AC_CR0,0,0,0_SX960_SY720__1759200114491.jpg"
  },
  {
    id: "platos-symposium",
    title: "Plato's Symposium: Eros and The Human Predicament",
    author: "Dr. Jamey Hecht",
    price: 32.00,
    description: "A clear exposition of Plato's great dialogue on love and sexuality, with each passage translated by the author and explained in the context of ancient Athenian culture and the Socratic movement.",
    isbn: "978-0805716399",
    year: 1999,
    pages: 304,
    condition: "Good",
    availability: "In Stock",
    coverImage: "/attached_assets/31M4XpaocbL._AC_CR0,0,0,0_SX480_SY360__1759200114490.jpg"
  },
  {
    id: "dodo-feathers",
    title: "Dodo Feathers: Poems 1989–2019",
    author: "Dr. Jamey Hecht",
    price: 25.00,
    description: "A collection of poems spanning three decades, exploring themes of loss, thwarted ambition, and transformation.",
    isbn: "978-1949093070",
    year: 2019,
    pages: 164,
    condition: "New",
    availability: "In Stock",
    coverImage: "/attached_assets/71MUTZuFBYL._AC_CR0,0,0,0_SX960_SY720__1759200114491.jpg"
  }
];

// Request validation schemas
export const checkoutRequestSchema = z.object({
  bookId: z.string().min(1),
  quantity: z.number().min(1).max(10).default(1),
});

export type CheckoutRequest = z.infer<typeof checkoutRequestSchema>;
