
// Authentication Middleware
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/users');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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

    if (req.user) {
        return next();
    }

    return unauth(req, res, next);
}

function unauth (req, res, next) {
    const err   = new Error('Not authenticated!');
    err.status  = 401;

    return next(err);
}

function inArray(needle, haystack) {
    const index = haystack.indexOf(needle);
    const bool  = index > -1;

    return bool;
}

module.exports = auth;
