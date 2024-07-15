
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = "AnySecretKey";

const getToken = async (email,user)=>{
    const token = jwt.sign({identifier : user._id },JWT_SECRET_KEY);
    return token;
}
module.exports = {
    getToken,
}