const mongoose = require('mongoose');
let Schema = mongoose.Schema;


let user = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});


const User = mongoose.model("User", user);

module.exports = User;