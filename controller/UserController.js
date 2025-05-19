const express = require ('express')

const mongoose = require('mongoose');
const User = require('../models/User');
const cookieParser = require('cookie-parser');



const app = express();

app.use(express.json())

const createUser =async(req,res)=>{

    try{

        const {name,email,age,password,nationality}= req.body;
        const profileImage = req.file ? req.file.filename : null;
        if(!name || !email  ||!age || !password  ||!nationality)
        {
            return res.status(400).json({message : "All fields are required"});
    }

    const NewUser = new User({name,email,age,password,nationality,profileImage})
    await  NewUser.save();
    res.status(201).json({message : "User Created Successfully"})
}
catch(error)
{
    console.error(error);
  return  res.status(500).json({messgae : 'server error'})
}
};


const getAllUser = async(req,res)=>{
try{
  const  user = await User.find();
  console.log(user)
  res.status(200).json(user)
}
catch(error){
 res.status(500).json({message: "Error fectching user"})
}
}


const getuserById = async(req,res)=>{
    try{
     const user  = await user.findById(req.params.id)
     if(! user){
        res.status(404),express.json({message :'user  not found'})
     }
     console.log(user)
    return res.status(200).json(user)
    }
    catch(error)
    {
        return res.status(500).json({message : "Error fetching user"})
    }
}

// update user Ny id
const updateUser = async (req, res) => {
  try {
    if (req.file) {
      updates.profileImage = req.file.filename;
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' }); // return = stop
    }

    console.log('Updated user:', updatedUser);
    return res.status(200).json(updatedUser); // ✅ only one response
  } catch (error) {
    console.error('Update error:', error);
    return res.status(500).json({
      message: 'Error updating user',
      error: error.message
    }); // ✅ only one error response
  }
};

// login
const loginUser=async(req,res)=>{
 const{email, password}= req.body
try{
 if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
const user = await User.findOne({email});

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }




  res.cookie('session_user',email,{
    http :true,
    maxAge :1000*60*60,
    sameSite : 'strict',
  });

  return res.send('Login successful . Cookie set');
}
catch(error){
  console.error(error)
  return res.status(500).json({message : "Server error"});
}
};

module.exports={createUser,getAllUser,getuserById,updateUser,loginUser};