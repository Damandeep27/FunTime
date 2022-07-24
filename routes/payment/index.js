const router=require('express').Router({mergeParams:true});
const {createCheckout} = require('./controller');

router.post('/create-checkout-session',createCheckout)

module.exports = router;