const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    firebase_uid: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    player: {
        size: {
            type: Number,
            default: 36
        },
        nameColor: {
            type: String,
            default: 'black'
        }
    }

}, { timestamps: true });

exports.User = mongoose.model('user', UsersSchema);