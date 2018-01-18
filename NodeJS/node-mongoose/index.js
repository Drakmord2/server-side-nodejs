
// Modules
const mongoose      = require('mongoose');
mongoose.Promise    = require('bluebird');
const server        = require('./server');

// Server Settings
const url       = 'mongodb://mongo:27017/conFusion';
const options   = {};
const conn      = mongoose.connection;

// Connection
conn.once('open', () => {
    server.start(conn);
});

mongoose.connect(url, options, server.onError);
