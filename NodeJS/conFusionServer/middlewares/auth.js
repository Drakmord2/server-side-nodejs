
// Authentication Middleware

let passthrough = [];

function auth (options) {
    if (options !== null) {
        passthrough = options.passthrough;
    }

    return middleware;
}

function middleware (req, res, next) {

    if ( inArray(req.url, passthrough) ) {
        return next();
    }

    if (! req.session.user) {
        return unauth(req, res, next);
    }

    if (req.session.user === 'authenticated') {
        return next();
    }

    return unauth(req, res, next);
}

function unauth (req, res, next) {
    const err   = new Error('Not authenticated!');
    err.status  = 401;

    next(err);
}

function inArray(needle, haystack) {
    const index = haystack.indexOf(needle);
    const bool  = index > -1;

    return bool;
}

module.exports = auth;
