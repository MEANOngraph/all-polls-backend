var express = require('express');
var router = express.Router();
var {userRegistration, userLogin} = require('../controllers/userController');


router.get('/signup', userRegistration);
router.get('/login', userLogin);

module.exports = router;
