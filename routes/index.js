var express = require('express');
var router = express.Router();

var db = require('../queries');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'web api with PostgreSQL b'
  });
});

router.get('/api/poptam/:tam_code/:year_pop', db.getPopTam);
router.get('/api/popamp/:amp_code/:year_pop', db.getPopAmp);
router.get('/api/poppro/:pro_code/:year_pop', db.getPopPro);
router.get('/api/popth/:year_pop', db.getPopTH);
router.get('/api/getprov', db.getProv);
router.get('/api/getamp/:prov_code', db.getAmp);
router.get('/api/gettam/:amp_code', db.getTam);

module.exports = router;