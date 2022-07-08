const { validationResult } = require('express-validator');
const { User } = require('../../models/User');

exports.login = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors[0].msg);

        
    } catch (err) {
        next(err);
    }
}