const { validationResult } = require('express-validator');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

exports.createCheckout = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors.map(err => err.msg).join(', '));

        const { name, emoji, price } = req.body;

        // create product
        const product = await stripe.products.create({
            name: `${name} - ${emoji}`,
            default_price_data:{
                currency: 'CAD',
                unit_amount: price * 100
            }
        });
    
        // create checkout session
        const session = await stripe.checkout.sessions.create({
            billing_address_collection: 'auto',
            shipping_address_collection: {
                allowed_countries: ['CA'],
            },
            line_items: [
                {
                    price: product.default_price,
                    quantity: 1
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:8080/shop?success=true`,
            cancel_url: `http://localhost:8080/shop?canceled=true`,
        });
        
        res.status(200).json(session);
    }
    catch (err) {
        next(err);
    }
};