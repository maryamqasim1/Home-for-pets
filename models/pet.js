const mongoose = require("mongoose");
const User = require('../models/user')

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    species: {
        type: String,
    },
    gender: {
        type: String,
        required: true,
        enum: ['Female', 'Male']
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    photo: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        enum: ['Available', 'Adopted']
    },
    owner: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;