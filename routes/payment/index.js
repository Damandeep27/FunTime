const router = require('express').Router();
const { createCheckout } = require('./controller');
const { authenticateToken } = require('#middlewares/authenticator.js'); 
const { 
    CreateSessionValidator 
} = require('#middlewares/validators.js');

router.post('/createCheckout', authenticateToken, CreateSessionValidator, createCheckout);

module.exports = router;