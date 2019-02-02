var promise = require('bluebird');
var options = {
    promiseLib: promise
}

var pgp = require('pg-promise')(options);
const connect = 'postgres://postgres:1234@localhost:5432/';

pl40DB = 'pl40';
var db = pgp(connect + pl40DB);

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


// var pgp = require('pg-promise')(options);
const hinfoDB = 'hinfo';
var hinfo = pgp(connect + hinfoDB);

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

// th data
// const pro40db = ;
var pro40db = pgp(connect + 'pro40');


getPopTam = (req, res, next) => {
    const tam_code = req.params.tam_code;
    const year_pop = req.params.year_pop;
    const sql = "select * from _poptam where tam_code = '" + tam_code + "' and year_pop=" + year_pop
    // console.log(tam_code, year_pop);
    pro40db.any(sql)
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
    pro40db.any(sql)
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
    pro40db.any(sql).then((data) => {
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
    pro40db.any(sql).then((data) => {
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

getProbbox = (req, res, next) => {
    const cql = req.body.cql;

    const sql = "select distinct st_xmin(st_extent(geom)) as ymin, st_ymin(st_extent(geom)) as xmin, st_xmax(st_extent(geom)) as ymax, st_ymax(st_extent(geom)) as xmax from province_gistda_4326 " + cql;

    pro40db.any(sql)
        .then((data) => {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'retrived prov data ' + cql
            })
        }).catch((error) => {
            return next(error)
        })
}

getDatapool = (req, res, next) => {
    const table = req.params.table;
    const sql = "select * from " + table;
    pro40db.any(sql)
        .then((data) => {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'retrived prov data '
            })
        }).catch((error) => {
            return next(error)
        })
}

getListField = (req, res, next) => {
    const table = req.params.table;
    const sql = "select * from dict_" + table;
    pro40db.any(sql).then((data) => {
        res.status(200).json({
            status: 'success',
            data: data,
            message: 'retrived List of field'
        })
    }).catch((error) => {
        return next(error)
    })
}

getDataYear = (req, res, next) => {
    const table = req.params.table;
    const sql = "select distinct year from " + table + " order by year";
    pro40db.any(sql).then((data) => {
        res.status(200).json({
            status: 'success',
            data: data,
            message: 'retrived List of year'
        })
    }).catch((error) => {
        return next(error)
    })
}


getSelectedData = (req, res, next) => {
    const table = req.params.table;
    const cql = req.params.cql;

    const sql = "select distinct year, " + cql + " from " + table + " group by year order by year";
    pro40db.any(sql).then((data) => {
        res.status(200).json({
            status: 'success',
            data: data,
            message: 'retrived List of year'
        })
    }).catch((error) => {
        return next(error)
    })
}

getSelectedSubData = (req, res, next) => {
    const table = req.params.table;
    const col = req.params.col;
    const where = req.params.where;
    let sql;

    if (where != "prov") {
        sql = "select year, pro_code, " + col + " from " + table + " where pro_code='" + where + "' group by year, pro_code order by year";
    } else {
        sql = "select year, pro_code, " + col + " from " + table + " group by year, pro_code order by year";
    }

    pro40db.any(sql).then((data) => {
        res.status(200).json({
            status: 'success',
            data: data,
            message: 'retrived List of year'
        })
    }).catch((error) => {
        return next(error)
    })
}

getDataCorr = (req, res, next) => {
    const table = req.params.table;
    const col = req.params.col;
    const year = req.params.year;

    const sql = "select pro_code, " + col + " from " + table + " where year=" + year + " group by year, pro_code order by pro_code";

    pro40db.any(sql).then((data) => {
        res.status(200).json({
            status: 'success',
            data: data,
            message: 'retrived List of year'
        })
    }).catch((error) => {
        return next(error)
    })
}

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
    createData: createData,
    // getBBOX
    getProbbox: getProbbox,
    getDatapool: getDatapool,
    getListField: getListField,
    getDataYear: getDataYear,
    getSelectedData: getSelectedData,
    getSelectedSubData: getSelectedSubData,
    getDataCorr: getDataCorr
}