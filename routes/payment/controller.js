const stripe = require('stripe')('sk_test_51L9rU2KMGpkmvkvMDPDIEWLpMEbK3Oxjeoo5X73fnr0ZWznIf4b3h4gOG8PSVcPyNGgJLW0soXzv8iVb3qFCRDNP00f6OfhSzA');
 const createCheckout =  async (req,res)=>{

  const name=req.body.name;
  const emoji=req.body.emoji;
  const price=+req.body.price;


  //create product 

  const product = await stripe.products.create({
    name: name,
    default_price_data:{
      currency:'CAD',
      unit_amount: price*100

    }
  });

  console.log(product);


    const session = await stripe.checkout.sessions.create({

      billing_address_collection: 'auto',
        shipping_address_collection: {
          allowed_countries: [ 'CA'],
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



module.exports={
    createCheckout
}