 const express = require ('express')

 const router = express.Router();

 const User = require('../models/User')
const upload = require('../middlewares/upload.js');
 const {createUser,getAllUser,getuserById,updateUser,loginUser} = require ('../controller/UserController')


 router.post('/user',upload.single('profileImage'),createUser)
 router.post('/login',loginUser)
 router.get('/get-user',getAllUser)
 router.get('/get-user/:id',getuserById)
 router.put('/update-user/:id',upload.single('profileImage'),
 updateUser)

 module.exports= router;