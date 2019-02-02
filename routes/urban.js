var express = require('express');
var router = express.Router();

var db = require('../queries_urban');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});



// add urban table
router.post('/addUrbanComment', db.addUrbanComment);
router.get('/urbanSelect', db.urbanSelect);
router.get('/urbanPlace', db.urbanPlace);
router.post('/urbanCommentReply', db.urbanCommentReply);


module.exports = router;