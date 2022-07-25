const router = require('express').Router();
const { 
    login, 
    addEmoji, 
    setEmoji, 
    deleteUser, 
    setName, 
    sendEmail, 
    sendSMS 
} = require('./controller');
const { authenticateToken } = require('#middlewares/authenticator.js'); 
const { 
    LoginValidator,
    EmojiValidator,
    DeleteValidator,
    SetNameValidator,
    SendEmailValidator,
    SendSMSValidator
} = require('#middlewares/validators.js');

router.post('/login', authenticateToken, LoginValidator, login);
router.patch('/setName', authenticateToken, SetNameValidator, setName);
router.patch('/addEmoji', authenticateToken, EmojiValidator, addEmoji);
router.patch('/setEmoji', authenticateToken, EmojiValidator, setEmoji);
router.delete('/delete', authenticateToken, DeleteValidator, deleteUser);
router.post('/sendEmail', authenticateToken, SendEmailValidator, sendEmail);
router.post('/sendSMS', authenticateToken, SendSMSValidator, sendSMS);

module.exports = router;