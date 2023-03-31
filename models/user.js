const mongoose = require('mongoose')

const userSchema = {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'NA'
    }
}

module.exports = mongoose.model('User', userSchema)