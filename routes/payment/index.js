const router = require('express').Router();
const { createCheckout } = require('./controller');
const { authenticateToken } = require('#middlewares/authenticator.js'); 
// const { 
//     CreateSessionValidator 
// } = require('#middlewares/validators.js');

router.post('/create-checkout-session', authenticateToken, createCheckout);

module.exports = router;