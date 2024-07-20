const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const {getToken} = require('../utils/helper');


router.post("/register",async (req,res)=>{

    const {email, password, firstName, lastName, userName} = req.body;

    const user = await User.findOne({email : email});
    // console.log("hello")
    if(user)
        {
            return res.status(403).json({
                error : "A user with the given email already exists"
            });
        }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserData = { email, password : hashedPassword, firstName, lastName, userName,likedSongs:[] };
    const newUser = await User.create(newUserData);

    // getting the token
    const token = await getToken(email,newUser);
    
    const userToReturn = {...newUser.toJSON(), token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
})

router.post("/login", async (req,res)=>{
    const {email, password} = req.body;
    
    const user = await User.findOne({email : email});
    if(!user)
        {
            return res.status(403).json({
                error : "Invalid Credentials",
            })
        }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid)
        {
            return res.status(403).json({
                error : "Invalid Credentials",
            })
        }
    
    const token = await getToken(user.email,user);
    const userToReturn = {...user.toJSON(),token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
})






//   NEW CODE FROM HERE 

router.post("/signup",)
module.exports = router