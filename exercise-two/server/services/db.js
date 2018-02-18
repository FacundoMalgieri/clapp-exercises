const mysql = require('mysql');
const consts = require('../config/constants');

// The db connection object.
let connection = mysql.createPool({
	connectionLimit: 100,
	host: consts.db.host,
	port: consts.db.port,
	user: consts.db.user,
	password: consts.db.password,
	database: consts.db.database
});

/**
 * Connect to the db and return a callback with errors and the connection
 * @param callback
 */
exports.connect = (callback) => connection.getConnection((err, conn) => callback(err, conn));