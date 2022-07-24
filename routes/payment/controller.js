const stripe = require('stripe')(process.env.STRIPE_SECRET);

exports.createCheckout =  async (req,res)=>{
    const { name, emoji, price } = req.body;

    // create product
    const product = await stripe.products.create({
        name: name,
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
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: product.default_price,
                quantity: 1
            },
        ],
        mode: 'payment',
        success_url: `http://localhost:3000/checkout?success=true`,
        cancel_url: `http://localhost:3000/checkout?canceled=true`,
    });
    
    res.redirect(303, session.url);
};