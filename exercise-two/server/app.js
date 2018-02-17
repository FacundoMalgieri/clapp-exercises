const consts = require('./config/constants.js');
const bodyParser = require('body-parser');
const db = require('./config/db.js');
const express = require('express');
const app = express();

// Parse requests of content-type - application/x-www-form-urlencoded.
app.use(bodyParser.urlencoded({ extended: true }));

// Parse requests of content-type - application/json.
app.use(bodyParser.json());

// Listen for requests and logs in the console the current host and port.
require('./routes/product.routes.js')(app);
const server = app.listen(consts.port, consts.host, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log(`Server is listening on port ${port} and host ${host}`);
});
