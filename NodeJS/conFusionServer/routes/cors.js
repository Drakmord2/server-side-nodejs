
// Modules
const cors = require('cors');

const whitelist = ['http://localhost:3000', 'https://localhost:3443'];

const corsOptionsDelegate = (req, callback) => {
    let corsOptions;

    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = {origin: true};

        return callback(null, corsOptions);
    }

    corsOptions = {origin: false};

    return callback(null, corsOptions);
};

// Export module
exports.cors            = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);