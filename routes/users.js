var express = require('express');
var router = express.Router();
var {userRegistration, userLogin} = require('../controllers/userController');


router.post('/signup', userRegistration);
router.post('/signin', userLogin);

module.exports = router;
