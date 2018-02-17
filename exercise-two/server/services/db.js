const mysql = require('mysql');
const consts = require('../config/constants');

// The db connection object.
let connection = mysql.createConnection({
  host: consts.db.host,
  port: consts.db.port,
  user: consts.db.user,
  password: consts.db.password,
  database: consts.db.database
});

// Connect to the DB.
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the DB...');
});

module.exports = {
  connection
};
