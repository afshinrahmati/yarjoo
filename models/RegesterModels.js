const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
    moblie: {
        type: String,
        unique: true,
        required: true
    },
    active: {
        type: String,
        default:0
    },
    code: {
        type: String
    },
    timer: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("user", User, "user");