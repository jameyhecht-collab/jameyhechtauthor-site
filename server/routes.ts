import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// Stripe integration for book sales - referenced from blueprint:javascript_stripe
let stripe: any = null;
if (process.env.STRIPE_SECRET_KEY) {
  const Stripe = require('stripe');
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Stripe payment route for one-time payments (book purchases)
  app.post("/api/create-payment-intent", async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ 
        message: "Payment processing not configured. Please set up Stripe API keys." 
      });
    }

    try {
      const { amount, description, bookId } = req.body;
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        description: description || "Book purchase",
        metadata: {
          bookId: bookId || "unknown"
        }
      });
      
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res.status(500).json({ 
        message: "Error creating payment intent: " + error.message 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
