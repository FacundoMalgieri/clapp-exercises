const consts = require('./config/constants.js');
const bodyParser = require('body-parser');
const db = require('./config/db.js');
const express = require('express');
const app = express();

// Parse requests of content-type - application/x-www-form-urlencoded.
app.use(bodyParser.urlencoded({ extended: true }));

// Parse requests of content-type - application/json.
app.use(bodyParser.json());

// Gives the app object to the routes file, there it can decide who will handle the request.
require('./routes/product.routes.js')(app);

// Listen for requests and logs in the console the current host and port.
const server = app.listen(consts.port, consts.host, () => {
  console.log(`Server is listening on port ${server.address().port} and host ${server.address().address}`);
});
