const { validationResult } = require('express-validator');
const { User } = require('#models/User.js');

exports.login = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors.map(err => err.msg).join(', '));

        const { firebase_uid } = req.body;

        // check if user already exist
        let user = await User.findOne({ firebase_uid });

        // if user doesnt exist create one
        if (!user) {
            user = new User(req.body);
            user.save({ ordered: false });
        } 

        res.status(200).json(user);

    } catch (err) {
        next(err);
    }
}

exports.addEmoji = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors.map(err => err.msg).join(', '));

        const { userId, emoji } = req.body;

        const user = await User.findOneAndUpdate(
            { 
                _id: userId,
                'player.emojiOwned': {
                    $ne: emoji
                }
            }, 
            {
                $push: {
                    'player.emojiOwned': emoji
                }
            }, 
            {
                new: true
            }
        )

        res.status(200).json(user);

    } catch (err) {
        next(err);
    }
}

exports.setEmoji = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors.map(err => err.msg).join(', '));

        const { userId, emoji } = req.body;

        const user = await User.findOneAndUpdate({ _id: userId }, {
            $set: {
                'player.emoji': emoji
            }
        }, {
            new: true
        })

        res.status(200).json(user);

    } catch (err) {
        next(err);
    }
}