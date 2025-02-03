import express from "express";
import Stripe from 'stripe';
import 'dotenv/config';

const app = express();
const PORT = 1234;
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
console.log(`key is ${process.env.STRIPE_PRIVATE_KEY}`);

app.use(express.static("dist")); // Serves all static files

const storeItems = new Map([
  [1, { priceInCents: 500, name: "Floating Tiki Bar" }],
  [2, { priceInCents: 400, name: "Garden Fountain" }],
])

const webhookSecret = process.env.WEBHOOK_SECRET as string;

app.post('/webhook', express.raw({type: 'application/json'}), async (request, response) => {
  const sig = request.headers['stripe-signature'];
  let event;

  try {
    event = await stripe.webhooks.constructEventAsync(request.body, sig, webhookSecret);
  } catch (err) {
    console.log(err.message)
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerEmail = session.customer_details.email;
    
    console.log(`emailing customer link at ${customerEmail}`);
  }
  else {}

  response.json({received: true});
});

app.use(express.json());

// API route
app.post("/api/embedded-checkout", async (req, res) => {
  console.log('received checkout request');
  
  const line_items = req.body.items.map(item => {
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
  });

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      return_url: `${process.env.CLIENT_URL}`,
    });

    res.json({ id: session.id, client_secret: session.client_secret })
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e.message })
  }
})




app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});