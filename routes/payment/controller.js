const { validationResult } = require('express-validator');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

exports.createCheckout = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors.map(err => err.msg).join(', '));

        const { userId, name, emoji, price } = req.body;

        // create product
        const product = await stripe.products.create({
            name: `${name} - ${emoji}`,
            default_price_data:{
                currency: 'CAD',
                unit_amount: price * 100
            }
        });
    
        const environment = {
            development: {
                frontendUrl: 'http://localhost:8080',
            },
            production: {
                frontendUrl: 'https://fun--time.herokuapp.com',
            }
        }[process.env.NODE_ENV || 'development'];

        // create checkout session
        const session = await stripe.checkout.sessions.create({
            billing_address_collection: 'auto',
            shipping_address_collection: {
                allowed_countries: ['CA'],
            },
            phone_number_collection: {
                enabled: true,
            },
            line_items: [
                {
                    price: product.default_price,
                    quantity: 1
                },
            ],
            mode: 'payment',
            success_url: `${environment.frontendUrl}/shop?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${environment.frontendUrl}/shop?canceled=true`,
            metadata: {
                emoji,
                userId
            }
        });
        
        res.status(200).json(session);
    }
    catch (err) {
        next(err);
    }
};

exports.getSession = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors.map(err => err.msg).join(', '));

        const { sessionId } = req.query;

        const session = await stripe.checkout.sessions.retrieve(sessionId);
        
        if (!session) throw new Error('Session not found');

        res.status(200).json(session);
    }
    catch (err) {
        next(err);
    }
};