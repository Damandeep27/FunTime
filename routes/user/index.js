const router = require('express').Router();
const controller = require('./controller');
const { 
    LoginValidator 
} = require('#middlewares/validators.js');

router.post('/login', LoginValidator, controller.login);

module.exports = router;