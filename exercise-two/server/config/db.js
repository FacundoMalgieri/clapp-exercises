const mysql = require('mysql');

// The db connection object.
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'clapps'
  });
  
// Connect to the DB.
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the DB...');
  });

module.exports = {
    connection
};
