const router = require('express').Router();
const {
    index,
    createuser,
    login,
    userAuthorized
} = require('../controllers/default_controller');

const  {
    authenticate
} = require('../middleware/athentication');

router.get('/', index);

router.post('/login', login);

router.post('/create-user', createuser);

router.get('/authorized-test', authenticate, userAuthorized);


module.exports=router;