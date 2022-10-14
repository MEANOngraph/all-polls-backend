const mongoose = require('mongoose');
let Schema = mongoose.Schema;


let polls = new Schema({
    userId: { type: String, required: true },
    question: { type: String, required: true },
    options: {type: Array, required: true },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
});


const Polls = mongoose.model("Polls", polls );

module.exports = Polls;