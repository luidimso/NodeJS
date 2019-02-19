"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 80,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        select: true,
        required: true
    },
    gender: {
        type: String,
        required: false,
        enum: ['M', 'F']
    }
});
userSchema.statics.findByEmail = function (email, projection) {
    return this.findOne({ email }, projection);
};
userSchema.methods.matches = function (password) {
    if (password == this.password) {
        return true;
    }
    else {
        return false;
    }
};
exports.User = mongoose.model('User', userSchema);
