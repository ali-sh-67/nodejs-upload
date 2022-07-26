const mongoose = require('mongoose');

const User = mongoose.model('user', mongoose.Schema({
    first_name: { type: String },
    email: { type: String, require: true },
    password: { type: String, require: true },
}), 'user')

module.exports = User;