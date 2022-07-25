const router = require('express').Router();
const { createCheckout, getSession } = require('./controller');
const { authenticateToken } = require('#middlewares/authenticator.js'); 
const { 
    CreateSessionValidator,
    GetSessionValidator
} = require('#middlewares/validators.js');

router.post('/createCheckout', authenticateToken, CreateSessionValidator, createCheckout);
router.get('/getSession', authenticateToken, GetSessionValidator, getSession);

module.exports = router;