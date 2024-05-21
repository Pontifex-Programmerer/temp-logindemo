const { generateAccessToken } = require('../handlers/tokenhandler');
const { standardResponse } = require('../handlers/responseHandler');
const User = require('../models/User');

const index = (req, res, next)=> {
    res.json({message:'route working with controller'});
}

const createuser = async (req, res, next)=> {
    const {username, password} = req.body;
    let result=null;
    try {
        result = await User.create({username, password});
    } catch(error) {
        result = {message:"error"};
    } finally {
        res.json(result);
    }
}

const login = async (req, res, next)=>{
    const  {username, password} = req.body;
    let user=null;
    let responseObject=standardResponse(null, {message: "Login failed!!"});
    try {
        user = await User.login(username, password);
        if(user){
            const {_id, username}  =user
            const token = generateAccessToken(_id, username);
            responseObject=standardResponse(user.username, {accessToken: token});
        }
    } catch(error){
        console.log(
            'An error occurred\n' +
            '-------------------\n' +
            error);
    }
    res.json(responseObject);
}

const userAuthorized = (req, res, next) => {
    const {user} = req.body;
    let responseObject = standardResponse('Anonymous', {message: 'security breached!'});
    console.log("typeof user:" ,typeof user)

    if(typeof user !== 'undefined' && user!==null){
        responseObject=standardResponse('Anonymous', {message: 'Endpoint reached'});
    } 
    res.json(responseObject);
}

module.exports= {
    index,
    createuser,
    login,
    userAuthorized
}