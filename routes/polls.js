var express = require('express');
var router = express.Router();
var pollsController = require('../controllers/pollsController');

router.get('/poll-list/:userId', pollsController.getPollsList);
router.post('/create-poll', pollsController.createPoll);
router.get('/poll-status/:pollId', pollsController.changePollStatus);
router.get('/get-poll/:pollId', pollsController.getPollDetails);
router.post('/submit-poll', pollsController.submitPoll);
router.get('/delete-poll/:pollId', pollsController.deletePoll);
router.get('/search/:query', pollsController.searchPolls);

module.exports = router;