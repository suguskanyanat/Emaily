const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        const charge = await stripe.charges.create({ //what we wanna do with the credit card
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id //token from Stripe
        });

        req.user.credits += 5;
        const user = await req.user.save();

        res.send(user); //send back updated user with new credits
    });
};