
const passport = require('passport');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const User = require('../models/User');

async function authMiddleware(req,res,next)
{
    // passport.authenticate("jwt",{session : false}) ;     // use this for authorization with passport.js
    let token = req.headers.authorization;
    if(!token || !token.startsWith('Bearer '))
    {
        return res.status(403).json({
            error : "Error, please Sign In again"
        });
    }

    token = token.split(' ')[1];
    console.log(JWT_SECRET_KEY);
    // const verify = jwt.verify(token,JWT_SECRET_KEY);
    // console.log(verify);
    try{
        const verify = jwt.verify(token,JWT_SECRET_KEY);
        console.log(verify);
        if(verify.identifier)
        {
            req.user = await User.findOne({_id: verify.identifier});
            next();
        }
        else{
            return res.status(407).json({
                error : "token not verified"
            })
        }
    }
    catch(e)
    {
        return res.status(403).json({
            error : "token not verified"
        })
    }
    
}

module.exports = authMiddleware;
