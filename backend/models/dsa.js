
const mongoose = require("mongoose");
const validator = require("validator");

const dsaSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        // add validation here description must not be empty
        validate: [validator.isLength, {
            min: 1,
            max: 100,
            message: "Description must be between 1 and 100 characters"
        }]
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
    },
    fileUploadedOn: {
        type: Date,
        default: Date.now,
        required: true,
    },
    likes:
    {
        type: Number,
        default: 0,
    }
});


const dsaModel = mongoose.model("dsa", dsaSchema);

module.exports = dsaModel;