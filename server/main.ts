// deno-lint-ignore-file
// @ts-nocheck
import express from "express";
import Stripe from 'stripe';
import 'dotenv/config';

const app = express();
const PORT = 1234;
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
console.log(`key is ${process.env.STRIPE_PRIVATE_KEY}`);

// Serve static assets first
app.use(express.static("dist")); // Serves all static files

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 20000, name: "Learn CSS Today" }],
])

app.use(express.json());

// API route
app.post("/create-checkout-session", async (req, res) => {
  console.log('received checkout request');
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `https://google.com`,
      cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    })
    console.log(res);
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});