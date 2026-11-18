const Razorpay = require('razorpay');
const razorpay = new Razorpay({ key_id: 'YOUR_KEY_ID', key_secret: 'YOUR_SECRET' });

const express = require("express");
const Stripe = require("stripe");

const router = express.Router();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.post('/create-order', async (req, res) => {
    const options = {
        amount: 50000, // Amount in currency subunits (e.g., 500.00)
        currency: 'INR',
        receipt: 'order_rcpt_11'
    };
    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
});



// Create Payment Intent
router.post("/create-payment-intent", async (req, res) => {

    try {

        const { amount, currency } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            automatic_payment_methods: {
                enabled: true
            }
        });

        res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
        console.log("Change in SecondFile");
    }

});

module.exports = router;