const User = require('../models/User');

const {
    standardResponse,
    NotAuthorized
} = require('../handlers/responseHandler');

const {
    verifyToken
} = require('../handlers/tokenhandler')

const authenticate = async (req, res, next) => {
    let user=null;
    const token = req.headers.authorization.split(' ')[1];
    const {_id, username} = await verifyToken(token);
    user = await User.findOne({_id});
    if(user!== null){
        req.body.user=user;
        console.log('bodyuser', req.body.user)
        next();
    } else {
        res.json(NotAuthorized());
    }
};

module.exports={
    authenticate,
}