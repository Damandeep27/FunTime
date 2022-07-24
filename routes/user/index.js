const router = require('express').Router();
const controller = require('./controller');
const { authenticateToken } = require('#middlewares/authenticator.js'); 
const { 
    LoginValidator 
} = require('#middlewares/validators.js');

router.post('/login', authenticateToken, LoginValidator, controller.login);

module.exports = router;