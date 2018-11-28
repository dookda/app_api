var promise = require('bluebird');
var options = {
    promiseLib: promise
}

var pgp = require('pg-promise')(options);
var connectString = 'postgres://postgres:1234@localhost:5432/hinfo';
var db = pgp(connectString);

selectSurveydata = (req, res, next) => {
    const sql = "select * from mobile_report order by pdate desc";
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
}

insertSurveydata = (req, res, next) => {
    // const lat = req.params.lat;
    // const lng = req.params.lng;
    // const pname = req.params.pname;
    // const pdesc = req.params.pdesc;
    // const photo = req.params.photo;
    // const pdate = req.params.pdate;
    // const pdate = req.params.ptype;

    console.log(req)

    // const sql = "INSERT INTO mobile_report (geom, lat, lon, pname, pdesc, photo, pdate, ptype)VALUES(ST_GeomFromText('POINT(" + lon + " " + lat + ")', 4326), " + lat + ", " + lon + ", '" + pname + "', '" + pdesc + "', '" + photo + "', '" + pdate + "', '" + ptype + "')";
    const sql = "INSERT INTO mobile_report (geom, lat, lon, pname, pdesc, photo, pdate, ptype)VALUES (ST_GeomFromText('POINT(${lon} ${lat})',4326), ${lat}, ${lon}, '${pname}', '${pdesc}', '${photo}', '${pdate}', '${ptype}')";
    // const sql = "select * from _poptam where tam_code = '" + tam_code + "' and year_pop=" + year_pop
    // console.log(tam_code, year_pop);
    db.any(sql, req.body)
        .then((data) => {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'retrived list'
            });
        })
        .catch((error) => {
            return next(error);
        })
}

module.exports = {
    selectSurveydata: selectSurveydata,
    // insertSurveydata: insertSurveydata
}