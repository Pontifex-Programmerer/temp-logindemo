const jwt = require('jsonwebtoken');
const TOKENSECRET = process.env.TOKENSECRET;

function generateAccessToken(user_id, username){
    if(typeof username === 'undefined' || typeof user_id === 'undefined') throw new Error('username or user_id not defined');
    console.log('Generating access token: ', username, user_id);
    return jwt.sign({username, _id:user_id}, TOKENSECRET, {expiresIn:"1d"});
}

async function verifyToken(token){
    let result = null;
    try {
        result = await jwt.verify(token, TOKENSECRET);
    } catch(error){
        console.error('Token could not be verified!\n', error)
    }

    return result;
}

module.exports={
    generateAccessToken,
    verifyToken
}