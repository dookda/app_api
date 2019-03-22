var promise = require('bluebird');
var options = {
    promiseLib: promise
}

// connection
var pgp = require('pg-promise')(options);
const connect = 'postgres://sakda:pgisDa45060071@202.29.52.232:5432/';
const local = 'postgres://postgres:1234@localhost/';

// data base
var urban = pgp(local + 'db_apakorn');
var th = pgp(connect + 'th');
var pro40 = pgp(local + 'pro40');
var hinfo = pgp(local + 'hinfo');

module.exports = {
    urban: urban,
    th: th,
    pro40: pro40,
    hinfo: hinfo
};