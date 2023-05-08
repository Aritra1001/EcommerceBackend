const router = require('express').Router();
const userFunc = require('../controller/usercontroller');
const {requireSignIn, isAdmin} = require('../middleware/usermiddleware');

// signup
router.post('/user/signup', userFunc.signup );
router.post('/user/login', userFunc.login);
router.get('/user/test', requireSignIn, isAdmin, userFunc.testFunc );


module.exports = router;