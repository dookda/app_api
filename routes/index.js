var express = require('express');
var router = express.Router();

var db = require('../queries');
// var db = require('../queries_province40');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'sgi web service'
  });
});

router.get('/api/poptam/:tam_code/:year_pop', db.getPopTam);
router.get('/api/popamp/:amp_code/:year_pop', db.getPopAmp);
router.get('/api/poppro/:pro_code/:year_pop', db.getPopPro);
router.get('/api/popth/:year_pop', db.getPopTH);
router.get('/api/getprov', db.getProv);
router.get('/api/getamp/:prov_code', db.getAmp);
router.get('/api/gettam/:amp_code', db.getTam);

// hinfi api
router.get('/api/hinfoSelect', db.hinfoSelect);
router.post('/api/hinfoInsert', db.hinfoInsert);
router.post('/api/createData', db.createData);

// get bbox
router.post('/api/getProbbox', db.getProbbox);
router.get('/api/getDatapool/:table', db.getDatapool);
router.get('/api/getListField/:table', db.getListField);
router.get('/api/getDataYear/:table', db.getDataYear);
router.get('/api/getSelectedData/:table/:cql', db.getSelectedData);
router.get('/api/getSelectedSubData/:table/:col/:where', db.getSelectedSubData);
router.get('/api/getDataCorr/:table/:col/:year', db.getDataCorr);


module.exports = router;