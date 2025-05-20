const proxy = require('express-http-proxy');

module.exports = proxy('http://localhost:8080');
