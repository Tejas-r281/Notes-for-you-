
const mongoose = require("mongoose");
const validator = require("validator");

const dbmsSchema = new mongoose.Schema({
    key:{
        type:String,
        required:true,
        unique:true,
    }
});


const dbmsModel = mongoose.model("dbms",dbmsSchema);

module.exports=dbmsModel;