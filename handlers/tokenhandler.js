const jwt = require('jsonwebtoken');
const tokenSecret = process.env.TOKENSECRET;

function generateAccessToken(username, user_id){
    return jwt.sign({username, _id:user_id}, tokenSecret, {expiresIn:"1d"});
}

async function verifyToken(token){
    let result = null;

    try {
        user = await jwt.verify(token, tokenSecret);
        console.log('User verified', user);
        if(user){
            result=user;
        }
    } catch(error){
        console.error('Token could not be verified!\n', error)
    }

    return result;
}

module.exports={
    generateAccessToken,
    verifyToken
}