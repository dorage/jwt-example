import mongoose from 'mongoose';
import crypto from 'crypto';
import { configs } from '../config';

const User = new mongoose.Schema({
    username: String,
    password: String,
    admin: { type: Boolean, default: false },
});

User.statics.create = function (username, password) {
    const encrypted = crypto
        .createHmac('sha1', configs.cookieSecret)
        .update(password)
        .digest('base64');
    const user = new this({ username, password: encrypted });
    return user.save();
};

User.statics.findOneByUsername = function (username) {
    return this.findOne({ username }).exec();
};

User.methods.verify = function (password) {
    const encrypted = crypto
        .createHmac('sha1', configs.cookieSecret)
        .update(password)
        .digest('base64');
    return this.password === encrypted;
};

User.methods.assignAdmin = function () {
    this.admin = true;
    return this.save();
};

const model = mongoose.model('User', User);

export default model;
