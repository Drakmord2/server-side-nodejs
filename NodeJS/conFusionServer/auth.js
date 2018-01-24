
// Authentication Middleware

function auth (req, res, next) {

    if (! req.signedCookies.user) {
        const authHeader = req.headers.authorization;

        if (! authHeader) {
            return unauth(req, res, next);
        }

        const auth = new Buffer(authHeader.split(' ')[1], 'base64').toString();
        const user = auth.split(':')[0];
        const pass = auth.split(':')[1];

        if (user === 'admin' && pass === 'password') {
            res.cookie('user', 'admin', {signed: true});

            return next();
        }

        return unauth(req, res, next);
    }

    if (req.signedCookies.user === 'admin') {
        return next();
    }

    return unauth(req, res, next);
}

function unauth (req, res, next) {
    const err   = new Error('Not authenticated!');
    err.status  = 401;

    res.setHeader('WWW-Authenticate', 'Basic');

    next(err);
}

module.exports = auth;