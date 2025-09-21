import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { BOOK_CATALOG, checkoutRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
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
