const router = require('express').Router();
const user = require('./user');
const payment = require('./payment');

router.use('/user', user);
router.use('/payment', payment);

module.exports = router;