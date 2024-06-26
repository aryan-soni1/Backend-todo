const mongoose = require("mongoose")
const User = require("../models/User")

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    }
},{timestamps:true})

module.exports = mongoose.model("Todo",todoSchema)