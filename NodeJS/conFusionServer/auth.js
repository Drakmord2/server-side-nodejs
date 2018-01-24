
function auth(req, res, next) {
    console.log(req.headers);

    const authHeader = req.headers.authorization;

    if (! authHeader) {
        const err = new Error('You are not authenticated!');

        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic');

        return next(err);
    }

    const auth = new Buffer(authHeader.split(' ')[1], 'base64').toString();
    const user = auth.split(':')[0];
    const pass = auth.split(':')[1];

    if (user === 'admin' && pass === 'password') {
        return next();
    }

    const err = new Error('Wrong credentials!');

    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic');

    return next(err);
}

module.exports = auth;