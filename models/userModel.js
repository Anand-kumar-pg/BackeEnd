const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = mongoose.Schema({

    fullName:{
        type:String,
        required:true,
        minLength:[4,"minimum four characters "],
        maxLength:[10, "maximum ten characters"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"please enter valid email"]
    },
    password:{
        type:String,
        required:true,
        minLength:[8,"minimum eight characters"]
    }
        
})

module.exports = mongoose.model("user", userSchema);