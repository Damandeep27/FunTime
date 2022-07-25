const { check } = require('express-validator');

exports.LoginValidator = [

    // firebase_uid Validator
    check('firebase_uid', 'firebase_uid is empty')
    .notEmpty(),

    // email Validator
    check('email', 'email is empty')
    .notEmpty(),

    // name Validator
    check('name', 'name is empty')
    .notEmpty(),
    
];

exports.CreateSessionValidator = [

    // userId Validator
    check('userId', 'userId is empty')
    .notEmpty(),

    // name Validator
    check('name', 'name is empty')
    .notEmpty(),
    
    // emoji Validator
    check('emoji', 'emoji is empty')
    .notEmpty(),

    // price Validator
    check('price', 'price is empty')
    .notEmpty(),
    
];

exports.GetSessionValidator = [

    // sessionId Validator
    check('sessionId', 'sessionId is empty')
    .notEmpty(),
    
];

exports.EmojiValidator = [

    // userId Validator
    check('userId', 'userId is empty')
    .notEmpty(),

    // emoji Validator
    check('emoji', 'emoji is empty')
    .notEmpty(),
    
];

exports.DeleteValidator = [

    // userId Validator
    check('userId', 'userId is empty')
    .notEmpty(),
    
];

exports.SetNameValidator = [

    // userId Validator
    check('userId', 'userId is empty')
    .notEmpty(),

    // name Validator
    check('name', 'name is empty')
    .notEmpty(),

]