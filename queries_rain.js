var promise = require('bluebird');
var options = {
    promiseLib: promise
}

var pgp = require('pg-promise')(options);
const connect = 'postgres://sakda:pgisDa45060071@202.29.52.232:5432/';

// var db = pgp(connect + 'db_apakorn');

var xml2js = require('xml2js');
var http = require('http');


readXML = (req, res, next) => {}



module.exports = {
    readXML: readXML
}