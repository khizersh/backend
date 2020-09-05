const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name:{
            required:true,
            type: String
        },
        email:{
            required:true ,
            type:String ,
            unique:true
        },
        password: {
            required:true,
            type: String
        },
        avatar: {
            type: String
        },
        date:{
            type: Date ,
            default: Date.now
        }
    });

    module.exports = user = mongoose.model('user',userSchema);