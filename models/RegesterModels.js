const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
    moblie: {
        type: String,
        unique: true
    },
    name: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,

    },
    password: {
        type: String,
    },
    active: {
        type: Number

    },
    code: {
        type: String,
    },
    expiencode: {
        type: Object
    },
    OKy: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,

    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("user", User, "user");