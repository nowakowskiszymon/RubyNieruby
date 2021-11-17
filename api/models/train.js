const mongoose = require("mongoose");

const trainSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    type: String,
    capacity: Number
});

module.exports = mongoose.model("Train", trainSchema);