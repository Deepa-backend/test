var mongoose = require('mongoose')


 
const userSchema = mongoose.Schema({
    name : String,
     
    email : String,

    age : Number,

    
    password : String,
    nationality:String,
    profileImage: { type: String }

});

const User = mongoose.model('User',userSchema);
  
module.exports =User