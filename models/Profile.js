const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
     company :{
         type: String
     },
     location :{
         type: String
     },
     website :{
         type: String
     },
     status :{
         type: String
     },
     skills :{
         type: [String],
         required: true
     },
     bio : {
         type: String
     },
     githubusername: {
         type: String
     },
     from: {
         type: Date,
         required: true
     },
     to: {
         type: Date
        
     },
     current:{
         type: Boolean
     },
     description:{
         type:String
     },
     date:{
         type: Date.now
     },
     githubusername: {
         type: String
     },
     facebook: {
         type: String
     },
     twitter: {
         type: String
     },
     linkedin: {
         type: String
     },
     experience : [],
     education : []
})

module.exports = Profile = mongoose.model('profile' , ProfileSchema)