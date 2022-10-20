var express = require('express');
var router = express.Router();
var pollsController = require('../controllers/pollsController');
const expressJwt = require('express-jwt');
const config = require('../config/config.json')
const auth = expressJwt({
    secret: config.JWT_SECRET,
    algorithms: ['HS256'],
});

router.get('/poll-list', auth, pollsController.getPollsList);
router.post('/create-poll', auth, pollsController.createPoll);
router.get('/poll-status/:pollId',auth, pollsController.changePollStatus);
router.get('/get-poll/:pollId', pollsController.getPollDetails);
router.post('/submit-poll', pollsController.submitPoll);
router.get('/delete-poll/:pollId',auth, pollsController.deletePoll);
router.get('/search/:query',auth, pollsController.searchPolls);

module.exports = router;