var express = require('express');
var router = express.Router();
var {userRegistration, userLogin} = require('../controllers/userController');


router.post('/signup', userRegistration);
router.post('/login', userLogin);

module.exports = router;
