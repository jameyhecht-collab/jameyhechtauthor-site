import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import fs from "fs";
import { storage } from "./storage";
import { BOOK_CATALOG, checkoutRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static PDFs - try multiple locations to find the file
  app.get(["*.pdf"], (req, res) => {
    const fileName = req.path.replace(/^\//, '');
    const cwd = process.cwd();
    const isDev = process.env.NODE_ENV === "development";
    
    // Try multiple possible locations
    const possiblePaths = [
      path.join(cwd, "dist", "public", fileName),
      path.join(cwd, "client", "public", fileName),
      path.join(cwd, "public", fileName),
      path.join(cwd, fileName),
    ];
    
    console.log(`PDF request: ${req.path}, isDev: ${isDev}, cwd: ${cwd}`);
    console.log(`Trying paths: ${JSON.stringify(possiblePaths)}`);
    
    // Find the first path that exists
    let foundPath: string | null = null;
    for (const tryPath of possiblePaths) {
      console.log(`Checking: ${tryPath} - exists: ${fs.existsSync(tryPath)}`);
      if (fs.existsSync(tryPath)) {
        foundPath = tryPath;
        break;
      }
    }
    
    if (foundPath) {
      console.log(`Serving PDF from: ${foundPath}`);
      res.sendFile(foundPath, (err) => {
        if (err) {
          console.error(`Error sending file: ${foundPath}`, err.message);
          res.status(500).json({ error: "Error sending file" });
        }
      });
    } else {
      // List what's actually in the directories to debug
      const dirs = [cwd, path.join(cwd, "dist"), path.join(cwd, "public")];
      for (const dir of dirs) {
        try {
          const contents = fs.readdirSync(dir);
          console.log(`Contents of ${dir}: ${JSON.stringify(contents)}`);
        } catch (e) {
          console.log(`Cannot read ${dir}`);
        }
      }
      console.error(`PDF not found in any location: ${fileName}`);
      res.status(404).json({ error: "File not found", tried: possiblePaths });
    }
  });

  // Stripe integration for book sales - referenced from blueprint:javascript_stripe
  let stripe: any = null;
  if (process.env.STRIPE_SECRET_KEY) {
    const { default: Stripe } = await import('stripe');
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  // Get book catalog
  app.get("/api/books", (req, res) => {
    res.json(BOOK_CATALOG);
  });

  // Secure checkout session creation - server controls pricing
  app.post("/api/create-checkout-session", async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ 
        error: "Payment processing not configured" 
      });
    }

    try {
      // Validate request with Zod schema
      const validation = checkoutRequestSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid request", 
          details: validation.error.errors 
        });
      }

      const { bookId, quantity = 1 } = validation.data;

      // Server-side lookup of book and price (prevents price tampering)
      const book = BOOK_CATALOG.find(b => b.id === bookId);
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }

      if (book.availability !== "In Stock") {
        return res.status(400).json({ error: "Book is not available" });
      }

      // Create Stripe Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: book.title,
                description: `${book.author} - ${book.condition} condition`,
              },
              unit_amount: Math.round(book.price * 100), // Server-controlled price
            },
            quantity: quantity,
          },
        ],
        shipping_address_collection: {
          allowed_countries: ['US', 'CA'],
        },
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/#bookstore`,
        metadata: {
          bookId: book.id,
          quantity: quantity.toString(),
        },
      });

      res.json({ sessionId: session.id, url: session.url });
    } catch (error: any) {
      console.error('Checkout session error:', error);
      res.status(500).json({ 
        error: "Unable to create checkout session",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
