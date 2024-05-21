const jwt = require('jsonwebtoken');
const tokenSecret = process.env.TOKENSECRET;

function generateAccessToken(username, user_id){
    if(typeof username === 'undefined' || typeof user_id === 'undefined') throw new Error('username or user_id not defined');
    console.log('Generating access token: ', username, user_id);
    return jwt.sign({username, _id:user_id}, tokenSecret, {expiresIn:"1d"});
}

async function verifyToken(token){
    let result = null;

    try {
        const {_id, username} = await jwt.verify(token, tokenSecret);
        console.log('User verified', username);
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