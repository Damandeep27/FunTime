const { validationResult } = require('express-validator');
const { User } = require('#models/User.js');
const twilioClient = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);
const mailjetClient = require('node-mailjet').apiConnect(
    process.env.MAILJET_API_KEY,
    process.env.MAILJET_API_SECRET
);

exports.login = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors.map(err => err.msg).join(', '));

        const { email } = req.body;

        // check if user already exist
        let user = await User.findOne({ email });

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

exports.getByEmail = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors.map(err => err.msg).join(', '));

        const { email } = req.query;

        // check if user already exist
        const user = await User.findOne({ email });

        if (!user) throw new Error('User not found')

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
            }
        )

        res.status(200).json(emoji);

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

exports.deleteUser = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors.map(err => err.msg).join(', '));

        const { userId } = req.body;

        const result = await User.deleteOne({ _id: userId });

        res.status(200).json(result);

    } catch (err) {
        next(err);
    }
}

exports.setName = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors.map(err => err.msg).join(', '));

        const { userId, name } = req.body;

        await User.findOneAndUpdate({ _id: userId }, {
            $set: {
                name
            }
        })

        res.status(200).json(name);

    } catch (err) {
        next(err);
    }
}

exports.sendEmail = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors.map(err => err.msg).join(', '));

        const { email, name, subject, html } = req.body;

        await mailjetClient.post("send", {'version': 'v3.1'})
        .request({
            "Messages":[
                {
                    "From": {
                        "Email": "stephenasuncion01@gmail.com",
                        "Name": "Stephen"
                    },
                    "To": [
                        {
                        "Email": email,
                        "Name": name
                        }
                    ],
                    "Subject": subject,
                    "HTMLPart": html
                }
            ]
        })

        res.status(200).json({ message: 'Successfully sent email' });

    } catch (err) {
        next(err);
    }
}

exports.sendSMS = async (req, res, next) => {
    try {
        const errors = validationResult(req).errors;
        if (errors.length > 0) throw new Error(errors.map(err => err.msg).join(', '));

        const { to, body } = req.body;

        await twilioClient.messages
        .create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: to,
            body: body
        })

        res.status(200).json({ message: 'Successfully sent sms' });

    } catch (err) {
        next(err);
    }
}