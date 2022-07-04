const mongoose = require("mongoose");
const validator = require("validator");

const commentMessageSchema = new mongoose.Schema({


        user:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        comment:
        {
            type: String,
            required: true,
            // add validation here description must not be empty
            validate: [validator.isLength, {
                min: 1,
                max: 500,
                message: "comment must be between 1 and 100 characters"
            }]
        },
});


const commentModel = mongoose.model("commentMessage",commentMessageSchema);

module.exports=commentModel;