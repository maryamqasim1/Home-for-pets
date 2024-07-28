const mongoose = require("mongoose");
const Pet = require('../models/pet')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
        default: 'user',
        enum: ['admin', 'user']
    },
    pets: [{ type: mongoose.Schema.ObjectId, ref: 'Pet' }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;