import express from 'express';
import Stripe from 'stripe';
import 'dotenv/config';
import { sendEmail } from './Email.ts';

const app = express();
const PORT = 1234;
const stripe = new Stripe(`${process.env.STRIPE_PRIVATE_KEY}`);
console.log(`key is ${process.env.STRIPE_PRIVATE_KEY}`);

app.use(express.static('dist')); // Serves all static files

const webhookSecret = process.env.WEBHOOK_SECRET as string;

app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (request, response) => {
    const sig = request.headers['stripe-signature'];
    let event;

    try {
      event = await stripe.webhooks.constructEventAsync(
        request.body,
        sig,
        webhookSecret
      );

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const customerEmail = session.customer_details.email;
        const customerName = session.customer_details.name;
        const line_items = await stripe.checkout.sessions.listLineItems(
          session.id
        );

        const lineItem = line_items.data[0];
        const price = lineItem.price;
        const productId = price?.product;
        const product = await stripe.products.retrieve(productId);
        const link = product.metadata.url;
        const productImage = product.images[0];

        console.log(`emailing ${customerName}`);
        sendEmail(customerEmail, customerName, link, lineItem, productImage);
      }
    } catch (err) {
      console.log(err.message);
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    response.json({ received: true });
  }
);

app.use(express.json());

// API route
app.post('/api/embedded-checkout', async (req, res) => {
  console.log('received checkout request');

  const id = req.body.items[0].id;
  const product = await stripe.products.retrieve(id);

  try {
    //@ts-expect-error
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      payment_method_types: ['card'],
      line_items: [
        {
          price: product.default_price, // Use the product's default price ID
          quantity: 1,
        },
      ],
      mode: 'payment',
      return_url: `${process.env.CLIENT_URL}/paymentSuccess`,
    });

    res.json({ id: session.id, client_secret: session.client_secret });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await stripe.products.list({
      limit: 100,
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/prices', async (req, res) => {
  try {
    const prices = await stripe.prices.list({
      limit: 100,
    });
    res.status(200).json(prices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/paymentSuccess', async (req, res) => {
  res.redirect('/paymentSuccess.html');
});

//redirect everything else to main page. must be last!!
app.get('*', (req, res) => {
  res.redirect('/404.html');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
