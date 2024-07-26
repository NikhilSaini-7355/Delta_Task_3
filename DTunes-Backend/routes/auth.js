const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const {getToken} = require('../utils/helper');
const axios = require('axios');

let access_token = '';

router.post("/register",async (req,res)=>{

    const {email, password, firstName, lastName, userName,profilePic} = req.body;

    const user = await User.findOne({email : email});
    // console.log("hello")
    if(user)
        {
            return res.status(403).json({
                error : "A user with the given email already exists"
            });
        }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserData = { email, password : hashedPassword,profilePic, firstName, lastName, userName,likedSongs:[] };
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


//  DAUTH LOGIC HERE

router.post("/dauth/getToken",async (req,res)=>{
   const {code,client_id,redirect_uri,client_secret,grant_type} = req.body;
    const clientData = new URLSearchParams();
    clientData.append('client_id', client_id);
    clientData.append('client_secret', client_secret);
    clientData.append('grant_type', 'authorization_code');
    clientData.append('code', code);
    clientData.append('redirect_uri', redirect_uri);

   try{
    const response = await fetch(`https://auth.delta.nitt.edu/api/oauth/token`,{
        method:"POST",
        headers:{
            "Content-Type" : "application/x-www-form-urlencoded",
        },
        body : clientData.toString()
       });
    const formattedResponse = await response.json();
    console.log(formattedResponse);
    access_token = formattedResponse.access_token;
    return res.status(200).json(formattedResponse);

    //     const response = await axios.post('https://auth.delta.nitt.edu/api/oauth/token', clientData.toString(), {
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         },
    //         body : clientData.toString()
    //     });
    //     access_token=response.data.access_token;
    // //   res.json(response.data);
    //     console.log(response.data)

   }
   catch(e){
    console.log(e);
    return res.status(403).json({
        error : e
    })
   }
})

router.get("/dauth/getUser",async (req,res)=>{
   if(access_token)
   {
    const response = await fetch("https://auth.delta.nitt.edu/api/resources/user",{
        method:"POST",
        headers:{
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${access_token}`
        }
       });
       const formattedResponse = await response.json();
    console.log(formattedResponse);
    return res.status(200).json(formattedResponse);
   }
   else {
    console.log("access_token is missing")
   }
})

router.post("/dauth/registerUser", async (req,res)=>{
    const email = req.body.email;
    const firstName = req.body.name.split(" ")[0];
    const lastName = req.body.name.split(" ")[1];
    const userName = firstName+"_"+lastName;

    const user1 = await User.findOne({email: email});

    if(user1){
    const token = await getToken(user1.email, user1); 
    const userToReturn = {...user1.toJSON(), token};
    return res.status(200).json(userToReturn);
    }

    const newUserData = {email, firstName, lastName, userName, password: email};

    const user = await User.create(newUserData);

    const token = await getToken(email, user); 
    const userToReturn = {...user.toJSON(), token};
    return res.status(200).json(userToReturn);
})

module.exports = router