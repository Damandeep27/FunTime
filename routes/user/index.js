const router = require('express').Router();
const { login, addEmoji, setEmoji } = require('./controller');
const { authenticateToken } = require('#middlewares/authenticator.js'); 
const { 
    LoginValidator,
    EmojiValidator
} = require('#middlewares/validators.js');

router.post('/login', authenticateToken, LoginValidator, login);
router.post('/addEmoji', authenticateToken, EmojiValidator, addEmoji);
router.post('/setEmoji', authenticateToken, EmojiValidator, setEmoji);

module.exports = router;