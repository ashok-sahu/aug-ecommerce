const mongoose = require('mongoose')

const catagorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    parentId:{
        type:String
    }
},{timestamps:true})

const Catagory = mongoose.model('Catagory',catagorySchema)
module.exports = Catagory