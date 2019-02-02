var express = require('express');
var router = express.Router();

// conect db
var con = require('./../db');
var db = con.pro40;


router.get('/listtable', (req, res, next) => {
    const sql = 'select id, adata as data, adesc as desc, unit, atable as table from list_table';
    db.any(sql).then((data) => {
        res.status(200).json({
            status: 'success',
            data: data,
            message: 'retrived data'
        })
    }).catch((error) => {
        return next(error)
    })
})

router.get('/listfield/:tb', (req, res, next) => {
    const tb = 'dict_' + req.params.tb;
    const sql = `select * from ${tb}`;
    db.any(sql).then((data) => {
        res.status(200).json({
            status: 'success',
            data: data,
            message: 'retrived data'
        })
    }).catch((error) => {
        return next(error)
    })
})

router.get('/selectdata/:tb/:fld', (req, res, next) => {
    const tb = req.params.tb;
    const fld = req.params.fld;
    const sql = `select distinct year, sum(${fld}) as dat from ${tb} group by year order by year`;
    db.any(sql).then((data) => {
        res.status(200).json({
            status: 'success',
            data: data,
            message: 'retrived data'
        })
    }).catch((error) => {
        return next(error)
    })
})

router.get('/selectdatabyyear/:tb/:fld/:yr', (req, res, next) => {
    const tb = req.params.tb;
    const fld = req.params.fld;
    const yr = req.params.yr;
    const sql = `select pro_name, sum(${fld}) as dat
                from ${tb} where year = ${yr} 
                group by pro_name order by sum(${fld}) desc`;
    db.any(sql).then((data) => {
        res.status(200).json({
            status: 'success',
            data: data,
            message: 'retrived data'
        })
    }).catch((error) => {
        return next(error)
    })
})

router.get('/selectdatacorr/:tb/:fld/:yr', (req, res, next) => {
    const tb = req.params.tb;
    const fld = req.params.fld;
    const yr = req.params.yr;
    const sql = `select pro_code, sum(${fld}) as ${fld}
                from ${tb} where year = ${yr} 
                group by pro_code order by pro_code desc`;
    db.any(sql).then((data) => {
        res.status(200).json({
            status: 'success',
            data: data,
            message: 'retrived data'
        })
    }).catch((error) => {
        return next(error)
    })
})

router.get('/selectgeombyyear/:tb/:fld/:yr', (req, res, next) => {
    const tb = req.params.tb;
    const fld = req.params.fld;
    const yr = req.params.yr;
    const sql = `with dat as (with tb2 as (select pro_code, sum(${fld}) as dat
                from ${tb} where year = ${yr} group by pro_code order by sum(${fld}) desc)
                select tb1.gid, tb1.pro_name, tb2.dat, tb1.geom from pro_sim_4326 tb1
                LEFT JOIN tb2 ON tb1.pro_code = tb2.pro_code)
                SELECT row_to_json(fc) AS geojson FROM 
                (SELECT 'FeatureCollection' As type, array_to_json(array_agg(f))
                As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON((lg.geom),15,0)::json As geometry,
                row_to_json((pro_name, lg.dat)) As properties
                FROM dat As lg) As f ) As fc`;
    db.any(sql).then((data) => {
        res.status(200).json({
            status: 'success',
            data: data,
            message: 'retrived data'
        })
    }).catch((error) => {
        return next(error)
    })
})

router.get('/listyear/:tb', (req, res, next) => {
    const tb = req.params.tb;
    const sql = `select distinct year from ${tb} order by year`;
    db.any(sql).then((data) => {
        res.status(200).json({
            status: 'success',
            data: data,
            message: 'retrived data'
        })
    }).catch((error) => {
        return next(error)
    })
})




module.exports = router;