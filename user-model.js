const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    telegramId: String,
    fistName: String,
    userName: String
});

const User = mongoose.model('name', UserSchema);

module.exports = User;