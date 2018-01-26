
// Passport Authentication

const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/users');
const JwtStrategy   = require('passport-jwt').Strategy;
const ExtractJwt    = require('passport-jwt').ExtractJwt;
const jwt           = require('jsonwebtoken');

const config = require('../config');

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const jwtOpts = {};
jwtOpts.jwtFromRequest  = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOpts.secretOrKey     = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(jwtOpts, (jwt_payload, done) => {
    console.log("JWT Payload: ", jwt_payload);

    User.findOne({_id: jwt_payload._id}, (err, user) => {
        if (err) {
            return done(err, false);
        }

        if (user) {
            return done(null, user);
        }

        return done(null, false);
    });
}));

exports.local = passport.use(new LocalStrategy(User.authenticate()));

exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, {expiresIn: 3600});
};

exports.verifyUser = passport.authenticate('jwt', {session: false});
