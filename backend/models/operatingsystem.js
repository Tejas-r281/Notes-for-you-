
const mongoose = require("mongoose");
const validator = require("validator");

const operatingSystemSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
    }
});


const operatingSystemModel = mongoose.model("operatingSystem", operatingSystemSchema);

module.exports = operatingSystemModel;

