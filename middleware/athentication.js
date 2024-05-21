const User = require('../models/User');

const {
    standardResponse,
    NotAuthorized
} = require('../handlers/responseHandler');

const {
    verifyToken
} = require('../handlers/tokenhandler')

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const user = await verifyToken(token);
    
    if(user!== null){
        next();
    } else {
        res.json(NotAuthorized());
    }
};

module.exports={
    authenticate,
}