var express = require('express');
var router = express.Router();

const http = require('http');
const request = require('request');
const csv = require('csvtojson');
const turf = require('@turf/turf');

// data
const json = require('./../data/json')

// conect db
var con = require('./../db');
var db = con.th;

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

// pl ud pr st extent
var poly_pl = turf.polygon(json.pl.features[0].geometry.coordinates[0]);
var poly_pr = turf.polygon(json.pr.features[0].geometry.coordinates[0]);
var poly_ud = turf.polygon(json.ud.features[0].geometry.coordinates[0]);
var poly_st = turf.polygon(json.st.features[0].geometry.coordinates[0]);

var poly = turf.polygon([
    [
        [99.36734051792395, 16.320423380302735],
        [101.19256380509475, 16.320423380302735],
        [101.19256380509475, 18.834396175460839],
        [99.36734051792395, 18.834396175460839],
        [99.36734051792395, 16.320423380302735]
    ]
]);


router.get('/test', (req, res, next) => {
    const sql = "select ST_AsGeoJSON(ST_LineMerge(geom))::jsonb from province where prov_code='53'";

    db.any(sql).then((data) => {
        // console.log(data);
        res.send(JSON.stringify(data))
        // res.status(200).json({
        //     status: 'success',
        //     data: da,
        //     message: 'retrived prov data'
        // })
    }).catch((error) => {
        return next(error)
    })

})

var b = []
const da = function () {
    request('http://www.cgi.uru.ac.th/geoserver/th/ows?service=WFS' +
        '&version=1.0.0&request=GetFeature&typeName=th%3Aprovince_4326' +
        '&CQL_FILTER=pro_code=%2753%27&outputFormat=application%2Fjson', {
            json: true
        }, async (err, res, body) => {
            await b.push(body.features[0].geometry.coordinates[0][0]);
            // console.log(d)
            // return d;
        })
}



router.get("/hp_modis", async function (req, res, next) {
    csv().fromStream(request.get('https://firms.modaps.eosdis.nasa.gov/data/active_fire/c6/csv/MODIS_C6_SouthEast_Asia_24h.csv'))
        .then(async (data) => {
            let jsonFeatures = [];
            let pl = 0;
            let pr = 0;
            let ud = 0;
            let st = 0;

            data.forEach(function (point) {
                let lat = Number(point.latitude);
                let lon = Number(point.longitude);
                let pt = turf.point([lon, lat]);
                if (turf.booleanPointInPolygon(pt, poly_pl) == true) pl += 1;
                if (turf.booleanPointInPolygon(pt, poly_pr) == true) pr += 1;
                if (turf.booleanPointInPolygon(pt, poly_ud) == true) ud += 1;
                if (turf.booleanPointInPolygon(pt, poly_st) == true) st += 1;
                if (turf.booleanPointInPolygon(pt, poly) == true) {
                    let feature = {
                        type: 'Feature',
                        properties: point,
                        geometry: {
                            type: 'Point',
                            coordinates: [lon, lat]
                        }
                    };
                    jsonFeatures.push(feature);
                }
            });
            let geoJson = {
                type: 'FeatureCollection',
                features: jsonFeatures
            };
            await res.status(200).json({
                status: 'success',
                pl: pl,
                pr: pr,
                st: st,
                ud: ud,
                data: geoJson,
                message: 'retrived survey data'
            })
        }).catch((error) => {
            return next(error)
        })
});

router.get("/hp_viirs", async function (req, res, next) {
    csv().fromStream(request.get('https://firms.modaps.eosdis.nasa.gov/data/active_fire/viirs/csv/VNP14IMGTDL_NRT_SouthEast_Asia_24h.csv'))
        .then(async (data) => {
            let jsonFeatures = [];
            let pl = 0;
            let pr = 0;
            let ud = 0;
            let st = 0;

            data.forEach(function (point) {
                let lat = Number(point.latitude);
                let lon = Number(point.longitude);
                let pt = turf.point([lon, lat]);
                if (turf.booleanPointInPolygon(pt, poly_pl) == true) pl += 1;
                if (turf.booleanPointInPolygon(pt, poly_pr) == true) pr += 1;
                if (turf.booleanPointInPolygon(pt, poly_ud) == true) ud += 1;
                if (turf.booleanPointInPolygon(pt, poly_st) == true) st += 1;
                if (turf.booleanPointInPolygon(pt, poly) == true) {
                    let feature = {
                        type: 'Feature',
                        properties: point,
                        geometry: {
                            type: 'Point',
                            coordinates: [lon, lat]
                        }
                    };
                    jsonFeatures.push(feature);
                }
            });
            let geoJson = {
                type: 'FeatureCollection',
                features: jsonFeatures
            };
            await res.status(200).json({
                status: 'success',
                pl: pl,
                pr: pr,
                st: st,
                ud: ud,
                data: geoJson,
                message: 'retrived survey data'
            });

        }).catch((error) => {
            return next(error)
        })
});

router.get("/hp_viirs_th", async function (req, res, next) {
    csv().fromStream(request.get('https://firms.modaps.eosdis.nasa.gov/data/active_fire/viirs/csv/VNP14IMGTDL_NRT_SouthEast_Asia_24h.csv'))
        .then(async (data) => {
            // let jsonFeatures = [];
            // let pl = 0;
            // let pr = 0;
            // let ud = 0;
            // let st = 0;

            // data.forEach(function (point) {
            //     let lat = Number(point.latitude);
            //     let lon = Number(point.longitude);
            //     let pt = turf.point([lon, lat]);
            //     if (turf.booleanPointInPolygon(pt, poly_pl) == true) pl += 1;
            //     if (turf.booleanPointInPolygon(pt, poly_pr) == true) pr += 1;
            //     if (turf.booleanPointInPolygon(pt, poly_ud) == true) ud += 1;
            //     if (turf.booleanPointInPolygon(pt, poly_st) == true) st += 1;
            //     if (turf.booleanPointInPolygon(pt, poly) == true) {
            //         let feature = {
            //             type: 'Feature',
            //             properties: point,
            //             geometry: {
            //                 type: 'Point',
            //                 coordinates: [lon, lat]
            //             }
            //         };
            //         jsonFeatures.push(feature);
            //     }
            // });
            // let geoJson = {
            //     type: 'FeatureCollection',
            //     features: jsonFeatures
            // };
            // await res.status(200).json({
            //     status: 'success',
            //     pl: pl,
            //     pr: pr,
            //     st: st,
            //     ud: ud,
            //     data: geoJson,
            //     message: 'retrived survey data'
            // });

            var points = turf.points([
                [-46.6318, -23.5523],
                [-46.6246, -23.5325],
                [-46.6062, -23.5513],
                [-46.663, -23.554],
                [-46.643, -23.557]
            ]);

            var searchWithin = turf.polygon([
                [
                    [-46.653, -23.543],
                    [-46.634, -23.5346],
                    [-46.613, -23.543],
                    [-46.614, -23.559],
                    [-46.631, -23.567],
                    [-46.653, -23.560],
                    [-46.653, -23.543]
                ]
            ]);

            await res.status(200).json({
                status: 'success',
                pl: pl,
                pr: pr,
                st: st,
                ud: ud,
                data: geoJson,
                message: 'retrived survey data'
            });

            var ptsWithin = turf.pointsWithinPolygon(points, searchWithin);
            console.log(ptsWithin);

        }).catch((error) => {
            return next(error)
        })
});

module.exports = router;