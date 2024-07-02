
const jwt = require('jsonwebtoken');

const getToken = async (email,user)=>{
    const token = jwt.sign({identifier : user._id },'anyRandomSecretKeyUseEnvVar');
    return token;
}
module.exports = {
    getToken,
}