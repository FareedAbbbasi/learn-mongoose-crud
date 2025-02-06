const e = require('express')
let mongoose = require('mongoose');

let userEnquireSchema = mongoose.Schema ({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true, 
        unique:true
    },
    phone:{
        type:String, 
        required:true, 
    },
    message:{
        type:String, 
        required:true
    }
})

let enquiryModle = mongoose.model("enquirey", userEnquireSchema)
module.exports = enquiryModle;
