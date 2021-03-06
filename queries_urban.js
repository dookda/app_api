con = require('./db');

db = con.urban;


addUrbanComment = (req, res, next) => {
    db.none("INSERT INTO mb_comment(lat, lng, code, uname, uphone, ucomment, dt, geom)VALUES(${lat}, ${lng}, ${code}, ${uname}, ${uphone}, ${ucomment}, now(), ST_SetSRID(ST_MakePoint(${lng},${lat}),4326))", req.body)
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

urbanSelect = (req, res, next) => {
    const sql = "select * from mb_comment order by dt desc";
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
};

urbanPlace = (req, res, next) => {
    const sql = "select * from huadong_loc4326";
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
};

urbanCommentReply = (req, res, next) => {
    const sql = "UPDATE mb_comment SET answer = ${answer} WHERE gid = ${gid}";
    db.none(sql, req.body)
        .then((data) => {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'retrived survey data'
            })
        }).catch((error) => {
            return next(error)
        })
};


module.exports = {
    // urban app
    addUrbanComment: addUrbanComment,
    urbanSelect: urbanSelect,
    urbanPlace: urbanPlace,
    urbanCommentReply: urbanCommentReply
}