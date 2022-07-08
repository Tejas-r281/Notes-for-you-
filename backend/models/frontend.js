
const mongoose = require("mongoose");
const validator = require("validator");

const forntendSchema = new mongoose.Schema({
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
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ],
});


const forntendModel = mongoose.model("forntend", forntendSchema);

module.exports = forntendModel;