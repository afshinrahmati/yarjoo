const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RegesterPhone = new Schema({
    number: {
        type: String,
        unique: true,
        required: true
    },
    a: {
        type: String
    },
    b: {
        type: String
    },
    c: {
        type: String
    },
    d: {
        type: String
    },
});

module.exports = mongoose.model("RegesterPhone", RegesterPhone, "RegesterPhone");