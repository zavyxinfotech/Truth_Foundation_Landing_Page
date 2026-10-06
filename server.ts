import 'dotenv/config';
import express from 'express';
import crypto from 'crypto';
import Razorpay from 'razorpay';

const app = express();
app.use(express.json());

const KEY_ID = process.env.RAZORPAY_KEY_ID;
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

if (!KEY_ID || !KEY_SECRET) {
  console.error('❌ RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set in .env');
  process.exit(1);
}

const razorpay = new Razorpay({
  key_id: KEY_ID,
  key_secret: KEY_SECRET,
});

// POST /api/create-order
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body as {
      amount: number;
      currency?: string;
      receipt?: string;
    };

    if (!amount || amount < 100) {
      res.status(400).json({ error: 'Amount must be at least 100 paise (₹1)' });
      return;
    }

    const order = await razorpay.orders.create({
      amount,              // already in paise from frontend
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
    });

    res.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err: unknown) {
    console.error('create-order error:', err);
    const status = (err as { statusCode?: number }).statusCode || 500;
    res.status(status).json({ error: 'Failed to create Razorpay order' });
  }
});

// POST /api/verify-payment
app.post('/api/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body as {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  };

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    res.status(400).json({ error: 'Missing required payment verification fields' });
    return;
  }

  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', KEY_SECRET!)
    .update(body)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    res.status(400).json({ error: 'Payment signature mismatch — possible tampering' });
    return;
  }

  res.json({ success: true, payment_id: razorpay_payment_id });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Truth Foundation API server running on http://localhost:${PORT}`);
  console.log(`   Razorpay Key ID: ${KEY_ID}`);
});
