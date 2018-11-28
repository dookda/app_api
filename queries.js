var promise = require('bluebird');
var options = {
    promiseLib: promise
}

var pgp = require('pg-promise')(options);
var connectString = 'postgres://postgres:1234@localhost:5432/pl40';
var db = pgp(connectString);

getProv = (req, res, next) => {
    const sql = "select distinct prov_code, prov_name, st_xmin(st_extent(geom)) as xmin, st_ymin(st_extent(geom)) as ymin, st_xmax(st_extent(geom)) as xmax, st_ymax(st_extent(geom)) as ymax from tambol_up group by prov_code, prov_name";

    db.any(sql)
        .then((data) => {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'retrived prov data'
            })
        }).catch((error) => {
            return next(error)
        })
}


getAmp = (req, res, next) => {
    // const sql = "select distinct amp_code, amp_name from tambol_up where prov_code = '65'";
    const prov_code = req.params.prov_code
    const sql = "select distinct amp_code, amp_name, st_xmin(st_extent(geom)) as xmin, st_ymin(st_extent(geom)) as ymin, st_xmax(st_extent(geom)) as xmax, st_ymax(st_extent(geom)) as ymax from tambol_up where prov_code ='" + prov_code + "' group by amp_code, amp_name";

    db.any(sql)
        .then((data) => {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'retrived amphoe data'
            });
        })
        .catch((error) => {
            return next(error)
        })
}

getTam = (req, res, next) => {
    const amp_code = req.params.amp_code;
    const sql = "select tam_code, tam_name, amp_code, amp_name, st_xmin(st_extent(geom)) as xmin, st_ymin(st_extent(geom)) as ymin, st_xmax(st_extent(geom)) as xmax, st_ymax(st_extent(geom)) as ymax  from tambol_up where amp_code = '" + amp_code + "' group by tam_code, tam_name, amp_code, amp_name";
    db.any(sql)
        .then((data) => {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'retrived tambon data'
            })
        })
        .catch((error) => {
            return next(error)
        })
}

getPopTam = (req, res, next) => {
    const tam_code = req.params.tam_code;
    const year_pop = req.params.year_pop;
    const sql = "select * from _poptam where tam_code = '" + tam_code + "' and year_pop=" + year_pop
    // console.log(tam_code, year_pop);
    db.any(sql)
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

getPopAmp = (req, res, next) => {
    const amp_code = req.params.amp_code;
    const year_pop = req.params.year_pop;
    // console.log(tam_code, year_pop);
    const sql = "select * from _popamp where amp_code = '" + amp_code + "' and year_pop=" + year_pop;
    db.any(sql)
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

getPopPro = (req, res, next) => {
    const pro_code = req.params.pro_code;
    const year_pop = req.params.year_pop;
    // console.log(tam_code, year_pop);
    const sql = "select * from _poppro where pro_code = '" + pro_code + "' and year_pop=" + year_pop;
    db.any(sql).then((data) => {
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

getPopTH = (req, res, next) => {
    const year_pop = req.params.year_pop;
    const sql = "select * from _popth where year_pop=" + year_pop;
    db.any(sql).then((data) => {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'retrived pop TH'
            })
        })
        .catch((error) => {
            return next(error);
        })
}

// var pgp = require('pg-promise')(options);
var connectHinfo = 'postgres://postgres:1234@localhost:5432/hinfo';
var hinfo = pgp(connectHinfo);

hinfoSelect = (req, res, next) => {
    const sql = "select * from mobile_report order by pdate desc";
    hinfo.any(sql)
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

hinfoInsert = (req, res, next) => {
    const sql = "INSERT INTO mobile_report (lat, lon, pname, pdesc, photo, pdate, ptype, geom)VALUES(${lat}, ${lon}, ${pname}, ${pdesc}, ${photo}, ${pdate}, ${ptype}, ST_SetSRID(ST_MakePoint(${lon},${lat}),4326))";
    hinfo.any(sql, req.body)
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

createData = (req, res, next) => {
    hinfo.none("INSERT INTO user_profile(uemail,upass)VALUES(${email},${pass})", req.body)
        .then((data) => {
            res.status(200).json({
                status: "success",
                data: data,
                message: "Add success"
            })
        })
        .catch((err) => {
            return next(err);
        })
};

module.exports = {
    // pop
    getPopTam: getPopTam,
    getPopAmp: getPopAmp,
    getPopPro: getPopPro,
    getPopTH: getPopTH,
    getProv: getProv,
    getAmp: getAmp,
    getTam: getTam,
    // hinfo
    hinfoSelect: hinfoSelect,
    hinfoInsert: hinfoInsert,
    createData: createData
}