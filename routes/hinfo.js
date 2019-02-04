var express = require('express');
var router = express.Router();

// conect db
var con = require('./../db');
var db = con.hinfo;

router.get('/', (req, res, next) => {
    res.send('dadsadad')
})


router.get('/select', (req, res, next) => {
    const sql = "SELECT * FROM mobile_report order by pdate desc";
    db.any(sql)
        .then((data) => {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'retrived survey data'
            })
        }).catch((error) => {
            return next(error)
        })
})

router.post('/insert', (req, res, next) => {
    const sql = "INSERT INTO mobile_report (lat, lon, pname, pdesc, photo, pdate, ptype, geom)VALUES(${lat}, ${lon}, ${pname}, ${pdesc}, ${photo}, ${pdate}, ${ptype}, ST_SetSRID(ST_MakePoint(${lon},${lat}),4326))";
    db.none(sql, req.body)
        .then((data) => {
            res.status(200).json({
                status: 'success',
                // data: data,
                message: 'retrived list'
            });
        })
        .catch((error) => {
            return next(error);
        })
})

router.post('/createuser', (req, res, next) => {
    const sql = "INSERT INTO user_profile (firstname, uname, upass, uemail, umobile, utoken)VALUES(${firstname}, ${uname}, ${upass}, ${uemail}, ${umobile}, ${utoken})";
    db.none(sql, req.body)
        .then((data) => {
            res.status(200).json({
                status: "success",
                // data: data,
                message: "Add success"
            })
        })
        .catch((err) => {
            return next(err);
        })
})

router.post('/login', (req, res, next) => {
    const sql = "SELECT firstname as name, utoken as id FROM user_profile WHERE uname=${uname} and upass=${upass}";
    db.any(sql, req.body)
        .then((data) => {
            console.log(data)
            res.status(200).json({
                status: "success",
                data: data,
                message: "Add success"
            })
        })
        .catch((err) => {
            return next(err);
        })
})

module.exports = router;