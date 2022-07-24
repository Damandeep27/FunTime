const router = require('express').Router();
const { login } = require('./controller');
const { authenticateToken } = require('#middlewares/authenticator.js'); 
const { 
    LoginValidator 
} = require('#middlewares/validators.js');

router.post('/login', authenticateToken, LoginValidator, login);

module.exports = router;