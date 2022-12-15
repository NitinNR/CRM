const mysql = require('mysql');
const dbConfig = require('../configs/db.config');

var connection = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port:dbConfig.PORT
})

module.exports = connection;
