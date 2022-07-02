
const mongoose = require("mongoose");
const validator = require("validator");

const dsaSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
    }
});


const dsaModel = mongoose.model("dsa", dsaSchema);

module.exports = dsaModel;