var express = require('express');
var router = express.Router();

var db = require('../queries_rain');

// add urban table
// router.post('/addUrbanComment', db.addUrbanComment);
// router.get('/urbanSelect', db.urbanSelect);
// router.get('/urbanPlace', db.urbanPlace);
// router.post('/urbanCommentReply', db.urbanCommentReply);
router.get('/', db.readXML)


module.exports = router;