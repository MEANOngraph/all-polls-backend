var express = require('express');
var router = express.Router();
var {getPollsList, createPoll, changePollStatus} = require('../controllers/pollsController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/poll-list', getPollsList);
router.post('/create-poll', createPoll);
router.get('/changePollStatus', changePollStatus);

module.exports = router;
