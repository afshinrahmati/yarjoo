const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
    moblie: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        unique: true,

    },
    password: {
        type: String,
    },
    active: {
        type: Number,
        default: 0
    },
    code: {
        type: String,


    },
    expiencode: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("user", User, "user");