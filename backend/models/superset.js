
const mongoose = require("mongoose");
const validator = require("validator");

const supersetSchema = new mongoose.Schema({
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
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
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


const supersetModel = mongoose.model("superset", supersetSchema);

module.exports = supersetModel;